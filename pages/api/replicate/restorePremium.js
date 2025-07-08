import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";
import { modelCosts } from "../../../lib/replicate/modelCosts";



const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ Helper to spend credits
async function spendCredits(userId, amount) {
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("credits_remaining")
    .eq("id", userId)
    .single();

  if (profileError) throw profileError;
  if (!profile || profile.credits_remaining < amount) {
    throw new Error("Insufficient credits");
  }

  const { error: rpcError } = await supabaseAdmin.rpc("deduct_credits", {
    uid: userId,
    amt: amount,
  });
  if (rpcError) throw rpcError;

  const { error: insertError } = await supabaseAdmin
    .from("credit_transactions")
    .insert({
      user_id: userId,
      amount: -amount,
      type: "spend",
    });
  if (insertError) throw insertError;
}

// ✅ Helper: concat Uint8Arrays
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

function uint8ToBase64(u8Arr) {
  let binary = "";
  for (let i = 0; i < u8Arr.length; i++) {
    binary += String.fromCharCode(u8Arr[i]);
  }
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

  // ✅ Require auth header to get user
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  // ✅ Verify Supabase JWT
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  const user = data?.user;

  if (error || !user) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ error: "Invalid token" });
  }

  const userId = user.id;

  try {
    // ✅ Deduct credits first
    await spendCredits(userId, modelCosts.restorePremium);

    // ✅ Call Replicate as before
    const input = {
      input_image: `data:image/png;base64,${imageBase64}`,
    };

    const outputStream = await replicate.run("flux-kontext-apps/restore-image", {
      input,
    });

    const reader = outputStream.getReader();
    let chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const fullBytes = concatUint8Arrays(chunks);
    const base64Image = uint8ToBase64(fullBytes);
    const imageUrl = `data:image/png;base64,${base64Image}`;

    console.log("✅ Final imageUrl:", imageUrl.slice(0, 50) + "...");

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Failed to restore image or deduct credits" });
  }
}
