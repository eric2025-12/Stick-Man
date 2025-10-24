import { useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function useCollisionDetection() {
  const { stickman, obstacles, endGame } = useContext(GameContext);

  useEffect(() => {
    const checkCollision = () => {
      obstacles.forEach((obs) => {
        if (
          stickman.x < obs.x + obs.width &&
          stickman.x + stickman.width > obs.x &&
          stickman.y < obs.y + obs.height &&
          stickman.height + stickman.y > obs.y
        ) {
          endGame();
        }
      });
    };

    const interval = setInterval(checkCollision, 50);
    return () => clearInterval(interval);
  }, [stickman, obstacles, endGame]);
}
