import React from "react";

export default function ChatModal({ fact, input, setInput, onClose }) {
  const handleSend = () => {
    alert("Send clicked! AI is not hooked up yet.");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        height: 600,
        backgroundColor: "rgba(196, 207, 161, 0.95)",
        border: "6px solid #0f380f",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        zIndex: 1000,
        fontFamily: "'Courier New', Courier, monospace",
        color: "#0f380f",
      }}
    >
      <header
        style={{
          backgroundColor: "#0f380f",
          color: "#c4cfa1",
          padding: "12px 16px",
          fontWeight: "bold",
          fontSize: 18,
          userSelect: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span>🕹️ 90s Character Chat</span>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#c4cfa1",
            fontWeight: "bold",
            fontSize: 18,
            cursor: "pointer",
          }}
          aria-label="Close chat"
        >
          ✕
        </button>
      </header>

      <section
        style={{
          flexGrow: 1,
          padding: 12,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          backgroundColor: "#c4cfa1",
          fontSize: 14,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontStyle: "italic",
            marginBottom: 8,
            color: "#4a4a4a",
          }}
        >
          📅 On This Day: {fact}
        </div>

        {/* Static default bot message */}
        <div
          style={{
            alignSelf: "flex-start",
            backgroundColor: "#8bac0f",
            color: "#0f380f",
            padding: "8px 12px",
            borderRadius: 16,
            maxWidth: "75%",
            whiteSpace: "pre-wrap",
            fontWeight: "normal",
            boxShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          Welcome to the 90s Character Chat! Type your vibe and I&apos;ll create a character for you.
        </div>
      </section>

      <footer
        style={{
          padding: 12,
          backgroundColor: "#0f380f",
          display: "flex",
          gap: 8,
        }}
      >
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your vibe here..."
          style={{
            flexGrow: 1,
            resize: "none",
            borderRadius: 8,
            border: "2px solid #c4cfa1",
            padding: 8,
            fontSize: 14,
            fontFamily: "'Courier New', Courier, monospace",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: "#8bac0f",
            border: "none",
            color: "#0f380f",
            fontWeight: "bold",
            padding: "0 16px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </footer>
    </div>
  );
}
