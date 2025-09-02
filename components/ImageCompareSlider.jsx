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

  // Compact container style
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "420px",
    margin: "0 auto",
    userSelect: "none",
    cursor: isDragging ? "grabbing" : "grab",
    overflow: "hidden",
    borderRadius: "10px",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    backgroundColor: "#1e293b",
  };

  // Compact image styling
  const imageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  };

  const afterImgStyle = {
    ...imageStyle,
    clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
    transition: isDragging ? "none" : "clip-path 0.2s ease",
    zIndex: 2,
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {/* Before image */}
      <img src={beforeImage} alt="Before" style={imageStyle} />

      {/* After image with clip-path */}
      <img src={afterImage} alt="After" style={afterImgStyle} />

      {/* Minimal slider handle */}
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
          boxShadow: "0 0 4px rgba(0,0,0,0.5)",
        }}
      >
        {/* Compact handle circle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.2)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDragging ? "grabbing" : "ew-resize",
          }}
        >
          {/* Simple drag indicator */}
          <div style={{ display: "flex", gap: "1px" }}>
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                style={{ 
                  width: "1px", 
                  height: "8px", 
                  backgroundColor: "#666",
                  borderRadius: "0.5px"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Compact labels */}
      <div style={labelStyle("left")}>BEFORE</div>
      <div style={labelStyle("right")}>AFTER</div>
    </div>
  );
}

const labelStyle = (pos) => ({
  position: "absolute",
  top: "6px",
  [pos]: "6px",
  background: "rgba(0, 0, 0, 0.7)",
  color: "#fff",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "8px",
  fontWeight: 600,
  letterSpacing: "0.3px",
  textTransform: "uppercase",
  zIndex: 5,
  opacity: 0.8,
});