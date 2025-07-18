import { useState, useRef, useEffect } from "react";

export default function ImageCompareSlider({ beforeImage, afterImage }) {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const onMove = (clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    let pos = ((clientX - left) / width) * 100;
    pos = Math.min(Math.max(pos, 0), 100);
    setSliderPos(pos);
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e) => {
    if (isDragging) onMove(e.clientX);
  };

  const onTouchStart = () => setIsDragging(true);

  const onTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      onMove(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
    } else {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    }
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        maxWidth: "800px",
        margin: "3rem auto",
        userSelect: "none",
        height: 0,
        paddingBottom: "56.25%", // 16:9 aspect ratio
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        border: "2px solid rgba(255,255,255,0.1)",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <img
        src={beforeImage}
        alt="Before"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          userSelect: "none",
          pointerEvents: "none",
          draggable: false,
        }}
      />
      <img
        src={afterImage}
        alt="After"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          transition: isDragging ? "none" : "clip-path 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 2,
          pointerEvents: "none",
          userSelect: "none",
          draggable: false,
        }}
      />
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
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
          userSelect: "none",
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
            <div style={{ width: "2px", height: "12px", backgroundColor: "#666", borderRadius: "1px" }} />
            <div style={{ width: "2px", height: "12px", backgroundColor: "#666", borderRadius: "1px" }} />
            <div style={{ width: "2px", height: "12px", backgroundColor: "#666", borderRadius: "1px" }} />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "600",
          zIndex: 5,
        }}
      >
        BEFORE
      </div>

      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "600",
          zIndex: 5,
        }}
      >
        AFTER
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "12px",
          zIndex: 5,
          opacity: isDragging ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        ← Drag to compare →
      </div>
    </div>
  );
}
