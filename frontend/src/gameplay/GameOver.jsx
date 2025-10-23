// src/components/GameOver.jsx
import React from "react";

const GameOver = ({ score, onRestart }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>💀 Game Over!</h1>
      <p style={{ fontSize: "1.2rem" }}>Final Score: <strong>{score}</strong></p>
      <button
        onClick={onRestart}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "crimson",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        🔁 Restart Game
      </button>
    </div>
  );
};

export default GameOver;
