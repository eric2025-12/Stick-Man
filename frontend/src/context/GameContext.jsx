import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // 🧍 Player State
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3); // Default player health = 3 hearts
  const [paused, setPaused] = useState(false);

  // 🆙 Increase Score
  const increaseScore = (points = 10) => {
    setScore((prev) => prev + points);
  };

  // 💔 Decrease Health
  const decreaseHealth = (amount = 1) => {
    setHealth((prev) => Math.max(prev - amount, 0)); // prevents negative health
  };

  // 🔁 Reset Game
  const resetGame = () => {
    setScore(0);
    setHealth(3);
    setPaused(false);
  };

  // ⏸️ Toggle Pause
  const togglePause = () => {
    setPaused((p) => !p);
  };

  return (
    <GameContext.Provider
      value={{
        score,
        health,
        paused,
        increaseScore,
        decreaseHealth,
        resetGame,
        togglePause,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
