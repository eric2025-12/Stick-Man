import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";

const HUD = () => {
  const { health, score, paused } = useContext(GameContext);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="hud" style={{ color: "white", display: "flex", gap: "15px", fontSize: "18px" }}>
      <span>❤️ Health: {health}</span>
      <span>⭐ Score: {score}</span>
      <span>⏱️ Time: {timer}s</span>
    </div>
  );
};

export default HUD;
