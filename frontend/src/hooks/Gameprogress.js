import { useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";
import { SoundContext } from "../context/SoundContext";

export default function useGameProgress() {
  const { score, increaseScore, level, nextLevel, isGameOver } = useContext(GameContext);
  const { playLevelUpSound } = useContext(SoundContext);

  useEffect(() => {
    if (!isGameOver && score > 0 && score % 10 === 0) {
      nextLevel();
      playLevelUpSound();
    }
  }, [score, isGameOver, nextLevel, playLevelUpSound]);

  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(() => increaseScore(1), 1000);
      return () => clearInterval(interval);
    }
  }, [isGameOver, increaseScore]);
}
