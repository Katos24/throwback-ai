import { useState, useRef, useEffect } from "react";

export default function ImageCompareSlider({ beforeImage, afterImage }) {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerHeight, setContainerHeight] = useState(400); // Default height

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

  // Calculate container height based on the first image
  useEffect(() => {
    if (beforeImage) {
      const img = new Image();
      img.onload = () => {
        const containerWidth = containerRef.current?.offsetWidth || 480;
        const aspectRatio = img.height / img.width;
        const calculatedHeight = containerWidth * aspectRatio;
        // Set reasonable bounds for height
        const maxHeight = window.innerHeight * 0.8; // 80% of viewport height
        const minHeight = 300;
        setContainerHeight(Math.min(Math.max(calculatedHeight, minHeight), maxHeight));
      };
      img.src = beforeImage;
    }
  }, [beforeImage]);

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
  maxWidth: "600px", 
  height: `${containerHeight}px`,
  margin: "0 auto",
  userSelect: "none",
  cursor: isDragging ? "grabbing" : "grab",
  overflow: "hidden",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  backgroundColor: "#1a1a2e",
  backdropFilter: "blur(20px)",
};

  // Both images now use the same positioning approach
  const imageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    pointerEvents: "none",
  };

  const afterImgStyle = {
    ...imageStyle,
    clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
    transition: isDragging ? "none" : "clip-path 0.3s ease",
    zIndex: 2,
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {/* Before image */}
      <img src={beforeImage} alt="Before" style={imageStyle} />

      {/* After image with clip-path */}
      <img src={afterImage} alt="After" style={afterImgStyle} />

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
          width: "3px",
          backgroundColor: "#fff",
          cursor: isDragging ? "grabbing" : "ew-resize",
          zIndex: 10,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.8)",
        }}
      >
        {/* Handle circle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "36px",
            height: "36px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            border: "2px solid rgba(0,0,0,0.2)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDragging ? "grabbing" : "ew-resize",
          }}
        >
          {/* Drag lines */}
          <div style={{ display: "flex", gap: "2px" }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{ 
                  width: "2px", 
                  height: "14px", 
                  backgroundColor: "#666",
                  borderRadius: "1px"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Labels */}
      <div style={labelStyle("left")}>BEFORE</div>
      <div style={labelStyle("right")}>AFTER</div>
      
      {/* Enhanced Hint */}
      <div style={hintStyle(isDragging)}>
        {isDragging ? "Keep dragging..." : "← Drag to compare →"}
      </div>
    </div>
  );
}

const labelStyle = (pos) => ({
  position: "absolute",
  top: "16px",
  [pos]: "16px",
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  zIndex: 5,
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
});

const hintStyle = (isDragging) => ({
  position: "absolute",
  bottom: "16px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "25px",
  fontSize: "11px",
  fontWeight: 600,
  zIndex: 5,
  opacity: isDragging ? 0.7 : 1,
  transition: "all 0.3s ease",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.15)",
  whiteSpace: "nowrap",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
});