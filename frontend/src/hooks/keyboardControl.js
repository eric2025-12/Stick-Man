import { useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function useKeyboardControls() {
  const { moveLeft, moveRight, jump, isGameOver } = useContext(GameContext);

  useEffect(() => {
    if (isGameOver) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") moveLeft();
      if (e.key === "ArrowRight") moveRight();
      if (e.key === " " || e.key === "ArrowUp") jump();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameOver, moveLeft, moveRight, jump]);
}
