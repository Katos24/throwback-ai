import { useState, useRef, useEffect } from "react";

export default function ImageCompareSlider({ beforeImage, afterImage }) {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Recalculate slider position (0–100%)
  const onMove = (clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    let pos = ((clientX - left) / width) * 100;
    setSliderPos(Math.min(Math.max(pos, 0), 100));
  };

  // Drag handlers
  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const stopDrag = () => setIsDragging(false);
  const moveMouse = (e) => isDragging && onMove(e.clientX);
  const moveTouch = (e) => isDragging && onMove(e.touches[0].clientX);

  // Global listeners while dragging
  useEffect(() => {
    const events = [
      ["mouseup",   stopDrag],
      ["touchend",  stopDrag],
      ["mousemove", moveMouse],
      ["touchmove", moveTouch],
    ];
    if (isDragging) {
      events.forEach(([evt, fn]) => window.addEventListener(evt, fn));
    }
    return () => {
      events.forEach(([evt, fn]) => window.removeEventListener(evt, fn));
    };
  }, [isDragging]);

  // Styles
  const containerStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "480px",
    margin: "3rem auto",
    userSelect: "none",
    cursor: isDragging ? "grabbing" : "grab",
    overflow: "hidden",
    borderRadius: "12px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    border: "2px solid rgba(255,255,255,0.1)",
    maxHeight: "80vh",        // never taller than viewport
  };

  const beforeImgStyle = {
    display: "block",
    width: "100%",
    height: "auto",
    objectFit: "contain",     // full image, no crop
    pointerEvents: "none",
  };

  const afterImgStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    pointerEvents: "none",
    clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
    transition: isDragging ? "none" : "clip-path 0.3s ease",
    zIndex: 2,
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <img src={beforeImage} alt="Before" style={beforeImgStyle} />

      <img src={afterImage}  alt="After"  style={afterImgStyle} />

      {/* Slider handle */}
      <div
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        style={{
          position: "absolute",
          top: 0,
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
          height: "100%",
          width: "2px",
          backgroundColor: "#fff",
          cursor: isDragging ? "grabbing" : "ew-resize",
          zIndex: 10,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "32px",
            height: "32px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            border: "2px solid rgba(0,0,0,0.1)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", gap: "2px" }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{ width: "2px", height: "12px", backgroundColor: "#666" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Labels & Hint */}
      <div style={labelStyle("left") }>BEFORE</div>
      <div style={labelStyle("right")}>AFTER</div>
      <div style={hintStyle(isDragging)}>← Drag to compare →</div>
    </div>
  );
}

const labelStyle = (pos) => ({
  position: "absolute",
  top: "20px",
  [pos]: "20px",
  backgroundColor: "rgba(0,0,0,0.7)",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: 600,
  zIndex: 5,
});

const hintStyle = (hidden) => ({
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "rgba(0,0,0,0.7)",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "20px",
  fontSize: "12px",
  zIndex: 5,
  opacity: hidden ? 0 : 1,
  transition: "opacity 0.3s ease",
});
