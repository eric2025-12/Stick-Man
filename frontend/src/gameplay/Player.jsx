import React, { useEffect, useState } from "react";

const Player = () => {
  const [position, setPosition] = useState({ x: 100, y: 300 });
  const speed = 5;

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition((prev) => {
        switch (e.key) {
          case "ArrowRight":
            return { ...prev, x: prev.x + speed };
          case "ArrowLeft":
            return { ...prev, x: prev.x - speed };
          case "ArrowUp":
            return { ...prev, y: prev.y - speed };
          case "ArrowDown":
            return { ...prev, y: prev.y + speed };
          default:
            return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "50px",
        height: "50px",
        backgroundColor: "red",
        transition: "0.05s",
      }}
    ></div>
  );
};

export default Player;
