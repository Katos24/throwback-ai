import Replicate from "replicate";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64, prompt } = req.body;

  if (!imageBase64 || !prompt) {
    return res.status(400).json({ error: "Missing image or prompt" });
  }

  let predictionId = null;

  try {
    // Simplify prompt to avoid safety issues
    const simplifiedPrompt = prompt.length > 100 ? 
      `Convert this to 90s cartoon style while preserving the person's appearance` : 
      prompt;

    console.log("Using simplified prompt:", simplifiedPrompt);

    // Format image properly
    let inputImage;
    if (imageBase64.startsWith("data:")) {
      inputImage = imageBase64;
    } else {
      inputImage = `data:image/jpeg;base64,${imageBase64}`;
    }

    // Create prediction (this gives us control to cancel)
    console.log("Creating FLUX Kontext prediction...");
    const prediction = await replicate.predictions.create({
      model: "black-forest-labs/flux-kontext-pro",
      input: {
        prompt: simplifiedPrompt,
        input_image: inputImage,
      }
    });

    predictionId = prediction.id;
    console.log("Prediction created:", predictionId);

    // Set up cancellation timeout (60 seconds - much shorter!)
    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`Cancelling prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction:", cancelError.message);
      }
    }, 60000); // 60 second timeout

    // Poll for result with shorter intervals
    const pollForResult = async (id, maxAttempts = 40, interval = 1500) => {
      let attempts = 0;
      
      while (attempts < maxAttempts) {
        try {
          const result = await replicate.predictions.get(id);
          console.log(`Poll ${attempts + 1}: ${result.status}`);
          
          if (result.status === "succeeded") {
            clearTimeout(cancelTimeout);
            return result.output;
          }
          
          if (result.status === "failed") {
            clearTimeout(cancelTimeout);
            throw new Error(result.error || "Prediction failed");
          }
          
          if (result.status === "canceled") {
            clearTimeout(cancelTimeout);
            throw new Error("Prediction was cancelled due to timeout");
          }
          
          await new Promise(resolve => setTimeout(resolve, interval));
          attempts++;
          
        } catch (pollError) {
          clearTimeout(cancelTimeout);
          throw pollError;
        }
      }
      
      // If we get here, we've exceeded max attempts
      clearTimeout(cancelTimeout);
      
      // Try to cancel the prediction
      try {
        await replicate.predictions.cancel(id);
        console.log("Cancelled prediction due to polling timeout");
      } catch (cancelError) {
        console.log("Failed to cancel after polling timeout:", cancelError.message);
      }
      
      throw new Error("Prediction polling timed out after 60 seconds");
    };

    // Wait for result
    const output = await pollForResult(predictionId);

    // Handle the output
    let imageUrl;
    if (output && typeof output.url === 'function') {
      imageUrl = output.url();
    } else if (typeof output === 'string') {
      imageUrl = output;
    } else if (Array.isArray(output)) {
      imageUrl = output[0];
    } else {
      console.log("Raw output:", output);
      imageUrl = output;
    }

    if (!imageUrl) {
      throw new Error("No image URL returned from FLUX Kontext");
    }

    console.log("Generation successful:", { predictionId, hasUrl: !!imageUrl });
    return res.status(200).json({ imageUrl });

  } catch (error) {
    console.error("Replicate error:", {
      predictionId,
      message: error.message,
      status: error.status
    });

    // Try to cancel the prediction if it exists and we're erroring out
    if (predictionId) {
      try {
        await replicate.predictions.cancel(predictionId);
        console.log("Cancelled prediction due to error:", predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction after error:", cancelError.message);
      }
    }

    // Handle specific error types
    if (error.message.includes('timed out') || error.message.includes('cancelled')) {
      return res.status(408).json({ 
        error: "Request timed out after 60 seconds. Please try again with a smaller image or different style.",
        details: "Prediction was automatically cancelled to prevent queue blocking"
      });
    }

    return res.status(500).json({ 
      error: error.message || "Failed to generate image",
      details: predictionId ? `Prediction ID: ${predictionId}` : "Failed to create prediction"
    });
  }
}