import { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import styles from "../../styles/AiPage.module.css";

const AVATAR_STYLES = {
  portrait: [
    { label: "Professional Headshot", value: "professional headshot, corporate style, clean background, business attire" },
    { label: "Artistic Portrait", value: "artistic portrait, dramatic lighting, creative composition, fine art photography style" },
    { label: "Vintage Portrait", value: "vintage portrait, classic photography, sepia tones, timeless elegance" },
    { label: "Modern Casual", value: "modern casual portrait, natural lighting, contemporary style, relaxed pose" },
    { label: "90s High School Yearbook", value: "90s high school yearbook photo of a stylish teenager, retro windbreaker jacket, big hair, bright neon colors, soft lighting, vintage Kodak film grain, centered school portrait, cheesy smile, plain background, 1990s fashion aesthetic, sharp focus" }
  ],
  fantasy: [
    { label: "Medieval Warrior", value: "medieval fantasy warrior, armor, sword, epic fantasy art style" },
    { label: "Magical Wizard", value: "powerful wizard, magical robes, staff, mystical aura, fantasy art" },
    { label: "Elven Noble", value: "elegant elven noble, ethereal beauty, fantasy clothing, mystical background" },
    { label: "Dragon Rider", value: "dragon rider, leather armor, adventurous spirit, fantasy landscape" },
  ],
  scifi: [
    { label: "Cyberpunk Character", value: "cyberpunk character, neon lights, futuristic clothing, urban dystopia" },
    { label: "Space Explorer", value: "space explorer, futuristic spacesuit, cosmic background, sci-fi aesthetic" },
    { label: "Robot Companion", value: "humanoid robot, sleek metallic design, glowing elements, sci-fi technology" },
    { label: "Alien Diplomat", value: "alien diplomat, otherworldly features, formal alien attire, cosmic setting" },
  ],
  historical: [
    { label: "Victorian Gentleman/Lady", value: "Victorian era, elegant period clothing, formal pose, historical accuracy" },
    { label: "1920s Flapper/Gentleman", value: "1920s style, Art Deco background, period fashion, Jazz Age aesthetic" },
    { label: "Renaissance Noble", value: "Renaissance nobility, rich fabrics, classical pose, period appropriate" },
    { label: "Wild West Character", value: "Wild West, cowboy/cowgirl attire, dusty frontier town, western aesthetic" },
  ],
  anime: [
    { label: "Anime Hero", value: "anime style, heroic pose, dynamic lighting, Japanese animation aesthetic" },
    { label: "Manga Character", value: "manga style, expressive eyes, stylized features, black and white shading" },
    { label: "Kawaii Style", value: "kawaii anime style, cute aesthetic, pastel colors, adorable features" },
    { label: "Dark Anime", value: "dark anime style, dramatic shadows, intense expression, gothic elements" },
  ]
};

export default function AiAvatarsTest() {
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user_gender, setGender] = useState("");
  const [styleCategory, setStyleCategory] = useState("portrait");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [useCustomPrompt, setUseCustomPrompt] = useState(false);
  const [styleStrength, setStyleStrength] = useState(20);
  const [workflowType, setWorkflowType] = useState("HyperRealistic-likeness");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Original file size (MB):", file.size / 1024 / 1024);
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
    }
  };

  const buildPrompt = () => {
    if (useCustomPrompt) return customPrompt;

    let prompt = "";
    if (user_gender) prompt += `${user_gender} `;
    if (selectedStyle) {
      prompt += selectedStyle;
    } else {
      prompt += "professional portrait, high quality, detailed";
    }
    prompt += ", IMPORTANT: preserve exact facial features, skin tone, ethnicity, and bone structure";
    return prompt;
  };

  const generateAvatar = async () => {
    if (!photo) {
      alert("Please upload a photo.");
      return;
    }

    if (!useCustomPrompt && !selectedStyle && !user_gender) {
      alert("Please select your gender and style, or use custom prompt.");
      return;
    }

    try {
      const compressedFile = await imageCompression(photo, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(compressedFile);
      });

      setIsLoading(true);
      setResultImageUrl(null);

      const finalPrompt = buildPrompt();
      console.log("Generated prompt:", finalPrompt);

      const response = await fetch("/api/replicate/aiAvatars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          prompt: finalPrompt,
          styleStrength: styleStrength,
          user_gender: user_gender,
          workflow_type: workflowType
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        alert(`Failed to generate avatar: ${errorData}`);
        return;
      }

      const data = await response.json();
      setResultImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error generating avatar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container} style={{ minHeight: "100vh", backgroundColor: "#111", color: "#0ff", fontFamily: "monospace", padding: 30 }}>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>AI Avatar Generator</h1>

      {/* Photo Upload */}
      <div style={{ marginBottom: 30 }}>
        <label style={{ display: "block", marginBottom: 10, fontSize: 18 }}>Upload Your Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{
            padding: 10,
            backgroundColor: "#000",
            color: "#0ff",
            border: "1px solid #0ff",
            borderRadius: 6
          }}
        />
      </div>

      {previewUrl && (
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Image
            src={previewUrl}
            alt="Uploaded photo"
            width={200}
            height={200}
            style={{ borderRadius: 8, border: "2px solid #0ff" }}
          />
        </div>
      )}

      {/* Prompt Type Selection */}
      <div style={{ marginBottom: 30 }}>
        <label style={{ display: "block", marginBottom: 10, fontSize: 16 }}>
          <input
            type="checkbox"
            checked={useCustomPrompt}
            onChange={(e) => setUseCustomPrompt(e.target.checked)}
            style={{ marginRight: 10 }}
          />
          Use Custom Prompt (Advanced)
        </label>
      </div>

      {useCustomPrompt ? (
        <div style={{ marginBottom: 30 }}>
          <label style={{ display: "block", marginBottom: 10, fontSize: 16 }}>Custom Prompt</label>
          <textarea
            placeholder="Describe your desired avatar style in detail..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              maxWidth: 600,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #0ff",
              background: "#000",
              color: "#0ff",
              fontFamily: "monospace",
            }}
          />
        </div>
      ) : (
        <>
          {/* Gender Selection */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 10, fontSize: 16 }}>Gender</label>
            <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
              {["male", "female", "non-binary"].map((g) => (
                <label key={g} style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    name="user_gender"        // <-- updated name to match API
                    value={g}
                    checked={user_gender === g}
                    onChange={(e) => setGender(e.target.value)}
                    style={{ marginRight: 8 }}
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </div>


          {/* Workflow Type */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 10, fontSize: 16 }}>Workflow Type</label>
            <select
              value={workflowType}
              onChange={(e) => setWorkflowType(e.target.value)}
              style={{
                padding: 8,
                backgroundColor: "#000",
                color: "#0ff",
                border: "1px solid #0ff",
                borderRadius: 4,
                width: 250
              }}
            >
              <option value="HyperRealistic-likeness">HyperRealistic-likeness</option>
              <option value="HyperRealistic">HyperRealistic</option>
              <option value="Realistic">Realistic</option>
              <option value="Stylistic">Stylistic</option>
            </select>
          </div>

          {/* Style Category */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 10, fontSize: 16 }}>Style Category</label>
            <select
              value={styleCategory}
              onChange={(e) => {
                setStyleCategory(e.target.value);
                setSelectedStyle("");
              }}
              style={{
                padding: 8,
                backgroundColor: "#000",
                color: "#0ff",
                border: "1px solid #0ff",
                borderRadius: 4,
                width: 200
              }}
            >
              <option value="portrait">Portrait</option>
              <option value="fantasy">Fantasy</option>
              <option value="scifi">Sci-Fi</option>
              <option value="historical">Historical</option>
              <option value="anime">Anime/Manga</option>
            </select>
          </div>

          {/* Style Selection */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 10, fontSize: 16 }}>Choose Style</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
              {AVATAR_STYLES[styleCategory].map((style) => (
                <label
                  key={style.value}
                  style={{
                    display: "block",
                    padding: 15,
                    border: selectedStyle === style.value ? "2px solid #0ff" : "1px solid #333",
                    borderRadius: 8,
                    backgroundColor: selectedStyle === style.value ? "#003" : "#000",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <input
                    type="radio"
                    name="style"
                    value={style.value}
                    checked={selectedStyle === style.value}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    style={{ marginRight: 10 }}
                  />
                  {style.label}
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Style Strength */}
      <div style={{ marginBottom: 30 }}>
        <label style={{ display: "block", marginBottom: 10, fontSize: 16 }}>
          Style Strength: {styleStrength}%
        </label>
        <input
          type="range"
          min="5"
          max="35"
          value={styleStrength}
          onChange={(e) => setStyleStrength(Number(e.target.value))}
          style={{ width: 200 }}
        />
        <div style={{ fontSize: 12, color: "#888", marginTop: 5 }}>
          Lower = preserve face better, Higher = stronger style transformation
        </div>
      </div>

      {/* Generate Button */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <button
          onClick={generateAvatar}
          disabled={isLoading}
          style={{
            padding: "15px 40px",
            fontSize: 18,
            borderRadius: 8,
            backgroundColor: isLoading ? "#666" : "#0ff",
            color: "#000",
            fontWeight: "bold",
            cursor: isLoading ? "not-allowed" : "pointer",
            border: "none",
          }}
        >
          {isLoading ? "Generating Avatar..." : "Generate Avatar"}
        </button>
      </div>

      {/* Result */}
      {resultImageUrl && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <h3>Your AI Avatar</h3>
          <Image
            src={resultImageUrl}
            alt="Generated Avatar"
            width={400}
            height={400}
            unoptimized
            style={{ borderRadius: 12, border: "3px solid #0ff" }}
          />
          <div style={{ marginTop: 20 }}>
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = resultImageUrl;
                link.download = 'ai-avatar.png';
                link.click();
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#0ff",
                color: "#000",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Download Avatar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
