// hooks/useImageRestore.js
import { useState, useCallback, useEffect } from "react";
import imageCompression from "browser-image-compression";

export default function useImageRestore({
  session,
  credits,
  isLoggedIn,
  refreshCredits,
  deductCredits,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [restoredUrl, setRestoredUrl] = useState("");
  const [status, setStatus] = useState("idle"); // idle | compressing | uploading | done | error
  const [error, setError] = useState("");

  // Clean up old preview URLs
  useEffect(() => {
    return () => previewUrl && URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const reset = useCallback(() => {
    setFile(null);
    setPreviewUrl("");
    setRestoredUrl("");
    setError("");
    setStatus("idle");
  }, []);

  const uploadFile = useCallback(async (rawFile) => {
    if (!rawFile) return;
    setStatus("compressing");
    try {
      const compressed = await imageCompression(rawFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });
      setFile(compressed);
      setPreviewUrl(URL.createObjectURL(compressed));
    } catch {
      setFile(rawFile);
      setPreviewUrl(URL.createObjectURL(rawFile));
    } finally {
      setStatus("idle");
    }
  }, []);

  const restoreImage = useCallback(
    async (prompt = "Restore this vintage photo") => {
      if (!file) {
        setError("Please upload a photo first");
        return;
      }
      if (credits < 1) {
        window.location.href = isLoggedIn ? "/pricing" : "/signup";
        return;
      }

      setStatus("uploading");
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = reader.result.split(",")[1];
          const headers = { "Content-Type": "application/json" };
          if (session?.access_token) {
            headers.Authorization = `Bearer ${session.access_token}`;
          }
          const res = await fetch("/api/replicate/restore", {
            method: "POST",
            headers,
            body: JSON.stringify({ imageBase64: base64, prompt }),
          });
          const data = await res.json();
          if (!res.ok || !data.imageUrl) {
            throw new Error(data.error || "Restore failed");
          }
          setRestoredUrl(data.imageUrl);
          isLoggedIn ? await refreshCredits() : deductCredits(1);
          setStatus("done");
        } catch (err) {
          setError(err.message);
          setStatus("error");
        }
      };
      reader.readAsDataURL(file);
    },
    [file, credits, isLoggedIn, refreshCredits, deductCredits, session]
  );

  return {
    previewUrl,
    restoredUrl,
    status,
    error,
    reset,
    uploadFile,
    restoreImage,
  };
}
