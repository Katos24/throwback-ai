export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";
import { modelCosts, modelVersions } from "../../../lib/replicate/modelCosts";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper functions
function getBase64SizeKB(base64String) {
  if (!base64String) return null;
  const sizeInBytes = (base64String.length * 3) / 4;
  return Math.round(sizeInBytes / 1024);
}

function generateSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null);
}

// Helper to concatenate Uint8Arrays (for premium stream handling)
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

// Helper to convert Uint8Array to base64 string
function uint8ToBase64(u8Arr) {
  let binary = "";
  for (let i = 0; i < u8Arr.length; i++) {
    binary += String.fromCharCode(u8Arr[i]);
  }
  return Buffer.from(binary, "binary").toString("base64");
}

export default async function handler(req, res) {
  console.log("🏛️ LIBRARY RESTORE API - Method:", req.method);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Request metadata
  const userAgent = req.headers['user-agent'];
  const ipAddress = getClientIP(req);
  const referrerUrl = req.headers.referer;
  const sessionId = generateSessionId();
  const startTime = Date.now();
  let queueStartTime = null;
  let processingStartTime = null;

  const { image, libraryId, librarySlug, restoreType = 'basic' } = req.body;

  // Validation
  if (!image) {
    return res.status(400).json({ error: "Missing image data" });
  }
  
  if (!libraryId && !librarySlug) {
    return res.status(400).json({ error: "Missing libraryId or librarySlug" });
  }

  if (!['basic', 'premium'].includes(restoreType)) {
    return res.status(400).json({ error: "Invalid restoreType. Must be 'basic' or 'premium'" });
  }

  let predictionId = null;
  let creditsDeducted = false;
  let library = null;

  try {
    // 1. FETCH LIBRARY DATA
    console.log(`🔍 Fetching library: ${librarySlug || libraryId}`);
    
    let query = supabaseAdmin
      .from('libraries')
      .select('*')
      .eq('active', true);
    
    if (libraryId) {
      query = query.eq('id', libraryId);
    } else {
      query = query.eq('slug', librarySlug);
    }
    
    const { data: libraryData, error: libraryError } = await query.single();

    if (libraryError || !libraryData) {
      console.error("❌ Library not found:", libraryError);
      return res.status(404).json({ 
        error: "Library not found or inactive",
        details: librarySlug || libraryId
      });
    }

    library = libraryData;
    console.log(`✅ Library found: ${library.name} (ID: ${library.id})`);

    // 2. CHECK CREDITS (only for premium)
    const CREDIT_COST = restoreType === 'premium' ? 40 : 0;
    const creditsRemaining = library.monthly_credits - library.credits_used;
    
    console.log(`💳 Credits - Type: ${restoreType}, Cost: ${CREDIT_COST}, Remaining: ${creditsRemaining}/${library.monthly_credits}`);

    if (CREDIT_COST > 0 && creditsRemaining < CREDIT_COST) {
      console.log("❌ Insufficient library credits");
      return res.status(403).json({ 
        error: 'Library out of credits',
        creditsRemaining,
        creditsNeeded: CREDIT_COST,
        resetDate: library.credits_reset_date
      });
    }

    // 3. SELECT MODEL & CONFIGURATION
    let model, input, timeoutMs, maxAttempts;

    if (restoreType === 'premium') {
      // Premium restoration (flux-kontext)
      model = "flux-kontext-apps/restore-image";
      input = {
        input_image: `data:image/png;base64,${image}`,
      };
      timeoutMs = 45000;
      maxAttempts = 30;
      console.log(`🤖 Using PREMIUM model: ${model}`);
    } else {
      // Basic restoration (your basic model)
      model = modelVersions.restoreBasic;
      input = {
        img: `data:image/png;base64,${image}`,
        prompt: "photo restoration",
      };
      timeoutMs = 50000;
      maxAttempts = 35;
      console.log(`🤖 Using BASIC model: ${model}`);
    }

    // 4. CREATE PREDICTION
    console.log("🚀 Creating prediction...");
    queueStartTime = Date.now();

    const prediction = restoreType === 'premium'
      ? await replicate.predictions.create({ model, input })
      : await replicate.predictions.create({ version: model, input });

    predictionId = prediction.id;
    console.log(`✅ Prediction created: ${predictionId}`);

    // 5. SETUP TIMEOUT CANCELLATION
    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`⏱️ Cancelling prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (err) {
        console.log("Failed to cancel:", err.message);
      }
    }, timeoutMs);

    // 6. POLL FOR RESULT
    const pollForResult = async (id, maxAttempts, interval = 1500) => {
      let attempts = 0;
      
      while (attempts < maxAttempts) {
        try {
          const result = await replicate.predictions.get(id);
          console.log(`📊 Poll ${attempts + 1}: ${result.status}`);
          
          if (result.status === 'processing' && !processingStartTime) {
            processingStartTime = Date.now();
            console.log(`Processing started after ${processingStartTime - queueStartTime}ms queue time`);
          }
          
          if (result.status === "succeeded") {
            clearTimeout(cancelTimeout);
            return result.output;
          }
          
          if (result.status === "failed") {
            clearTimeout(cancelTimeout);
            throw new Error(result.error || `${restoreType} restoration failed`);
          }
          
          if (result.status === "canceled") {
            clearTimeout(cancelTimeout);
            throw new Error(`${restoreType} restoration was cancelled`);
          }
          
          await new Promise(resolve => setTimeout(resolve, interval));
          attempts++;
          
        } catch (pollError) {
          clearTimeout(cancelTimeout);
          throw pollError;
        }
      }
      
      clearTimeout(cancelTimeout);
      throw new Error(`${restoreType} restoration timed out`);
    };

    const output = await pollForResult(predictionId, maxAttempts);

    // 7. PROCESS OUTPUT (handle both URL and stream for premium)
    let imageUrl;
    
    if (typeof output === 'string') {
      imageUrl = output;
    } else if (output?.getReader) {
      console.log("📦 Processing output stream...");
      const reader = output.getReader();
      let chunks = [];
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        
        const fullBytes = concatUint8Arrays(chunks);
        const base64Image = uint8ToBase64(fullBytes);
        imageUrl = `data:image/png;base64,${base64Image}`;
      } catch (streamError) {
        throw new Error(`Stream processing failed: ${streamError.message}`);
      }
    } else if (Array.isArray(output)) {
      imageUrl = output[0];
    } else {
      console.log("⚠️ Unexpected output format:", typeof output);
      imageUrl = output;
    }

    if (!imageUrl) {
      throw new Error("No image data returned from restoration");
    }

    // 8. DEDUCT CREDITS & UPDATE TOTAL RESTORATIONS
    if (CREDIT_COST > 0) {
      // Premium - deduct credits and increment total
      const { error: updateError } = await supabaseAdmin
        .from('libraries')
        .update({ 
          credits_used: library.credits_used + CREDIT_COST,
          total_restorations: (library.total_restorations || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', library.id);

      if (updateError) {
        console.error("❌ Failed to deduct credits:", updateError);
        throw new Error("Failed to deduct credits");
      }

      creditsDeducted = true;
      console.log(`✅ Deducted ${CREDIT_COST} credits from ${library.name} | Total restorations: ${(library.total_restorations || 0) + 1}`);
    } else {
      // Basic - just increment total restorations (free)
      const { error: updateError } = await supabaseAdmin
        .from('libraries')
        .update({ 
          total_restorations: (library.total_restorations || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', library.id);

      if (updateError) {
        console.error("⚠️ Failed to update total restorations:", updateError);
        // Don't throw - this is not critical for free restorations
      } else {
        console.log(`✅ Basic restoration - FREE | Total restorations: ${(library.total_restorations || 0) + 1}`);
      }
    }

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    console.log(`🎉 SUCCESS - ${restoreType} restoration completed in ${totalTime}ms`);

    // Log successful request to library_requests table
    try {
      const { error: logError } = await supabaseAdmin
        .from('library_requests')
        .insert({
          library_id: library.id,
          restore_type: restoreType,
          status: 'completed',
          credits_used: CREDIT_COST,
          processing_duration_ms: totalTime,
          ip_address: ipAddress
        });

      if (logError) {
        console.error('⚠️ Failed to log request:', logError);
        // Don't fail the request if logging fails
      } else {
        console.log(`✅ Logged ${restoreType} restoration for ${library.name}`);
      }
    } catch (logErr) {
      console.error('⚠️ Error logging request:', logErr);
    }

    return res.status(200).json({ 
      restoredImage: imageUrl,
      restoreType,
      creditsUsed: CREDIT_COST,
      creditsRemaining: creditsRemaining - CREDIT_COST,
      processingTimeMs: totalTime,
      libraryName: library.name
    });

  } catch (error) {
    const endTime = Date.now();
    const totalTime = endTime - startTime;

    console.error("❌ ERROR:", {
      library: library?.name || 'unknown',
      predictionId,
      creditsDeducted,
      restoreType,
      message: error.message,
      totalTime: `${totalTime}ms`
    });

    // REFUND CREDITS on failure (if they were deducted)
    if (creditsDeducted && library) {
      try {
        const { error: refundError } = await supabaseAdmin
          .from('libraries')
          .update({ 
            credits_used: library.credits_used, // Reset to original value
            total_restorations: library.total_restorations, // Don't increment on failure
            updated_at: new Date().toISOString()
          })
          .eq('id', library.id);

        if (refundError) {
          console.error("⚠️ CRITICAL: Failed to refund credits:", refundError);
        } else {
          console.log(`✅ Refunded ${restoreType === 'premium' ? 40 : 0} credits to ${library.name}`);
        }
      } catch (refundErr) {
        console.error("⚠️ CRITICAL: Error during refund:", refundErr);
      }
    }

    // Cancel prediction if it exists
    if (predictionId) {
      try {
        await replicate.predictions.cancel(predictionId);
        console.log("🛑 Cancelled prediction:", predictionId);
      } catch (cancelErr) {
        console.log("Failed to cancel:", cancelErr.message);
      }
    }

    // Log failed request to library_requests table
    if (library) {
      try {
        const { error: logError } = await supabaseAdmin
          .from('library_requests')
          .insert({
            library_id: library.id,
            restore_type: restoreType,
            status: 'failed',
            credits_used: 0, // No credits charged on failure
            processing_duration_ms: totalTime,
            ip_address: ipAddress,
            error_message: error.message
          });

        if (logError) {
          console.error('⚠️ Failed to log error:', logError);
        }
      } catch (logErr) {
        console.error('⚠️ Error logging failed request:', logErr);
      }
    }

    // Handle specific errors
    if (error.message.includes('timed out') || error.message.includes('cancelled')) {
      return res.status(408).json({ 
        error: `Request timed out. Please try again with a smaller image.`,
        creditsRefunded: creditsDeducted,
        restoreType
      });
    }

    if (error.message.includes('out of credits')) {
      return res.status(403).json({ 
        error: "Library out of credits",
        creditsRemaining: library ? library.monthly_credits - library.credits_used : 0,
        resetDate: library?.credits_reset_date
      });
    }

    return res.status(500).json({ 
      error: error.message || "Failed to restore image",
      details: predictionId ? `Prediction ID: ${predictionId}` : "Failed to create prediction",
      creditsRefunded: creditsDeducted,
      restoreType
    });
  }
}