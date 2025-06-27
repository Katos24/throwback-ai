// src/components/Hotspot.js
export default function Hotspot({ position, onClick, style = {}, ...props }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        cursor: "pointer",
        zIndex: 2,
        ...position, // top, left, width, height
        ...style,    // any custom overrides
      }}
      {...props}
    />
  );
}