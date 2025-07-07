import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Helper: concat Uint8Arrays
function concatUint8Arrays(arrays) {
  let totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  let result = new Uint8Array(totalLength);
  let offset = 0;
  for (let arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

// Helper: convert Uint8Array to base64
function uint8ToBase64(u8Arr) {
  // Convert Uint8Array to string of raw bytes
  let binary = "";
  for (let i = 0; i < u8Arr.length; i++) {
    binary += String.fromCharCode(u8Arr[i]);
  }
  // Encode binary string to base64
  return Buffer.from(binary, "binary").toString("base64");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: "Missing imageBase64" });
  }

  try {
    const input = {
      input_image: `data:image/png;base64,${imageBase64}`,
    };

    // Call Replicate model (returns ReadableStream of image bytes)
    const outputStream = await replicate.run("flux-kontext-apps/restore-image", { input });

    // Read stream fully as Uint8Arrays
    const reader = outputStream.getReader();
    let chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    // Concatenate all chunks
    const fullBytes = concatUint8Arrays(chunks);

    // Convert bytes to base64 string
    const base64Image = uint8ToBase64(fullBytes);

    // Add data URI prefix
    const imageUrl = `data:image/png;base64,${base64Image}`;

    console.log("Final imageUrl sent:", imageUrl.slice(0, 50) + "...");

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error calling Replicate restore-image model:", error);
    res.status(500).json({ error: "Failed to restore image" });
  }
}
