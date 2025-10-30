import React, { useEffect, useRef, useState } from "react";
import Player from "./Player";
import Enemy from "./Enemy";
import HUD from "./HUD";
import GameOver from "./GameOver";

const GamePlay = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState({ x: 100, y: 300, health: 100 });
  const [enemies, setEnemies] = useState([]);
  const [keys, setKeys] = useState({});

  // Handle key presses
  useEffect(() => {
    const handleDown = (e) => setKeys((prev) => ({ ...prev, [e.key]: true }));
    const handleUp = (e) => setKeys((prev) => ({ ...prev, [e.key]: false }));
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  // Spawn enemies every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setEnemies((prev) => [
          ...prev,
          { x: 800, y: 300, health: 30, speed: 1 + Math.random() * 2 },
        ]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // === PLAYER MOVEMENT ===
      let newPlayer = { ...player };
      if (keys["ArrowRight"]) newPlayer.x += 4;
      if (keys["ArrowLeft"]) newPlayer.x -= 4;

      // Limit within screen
      newPlayer.x = Math.max(0, Math.min(canvas.width - 30, newPlayer.x));

      // === DRAW PLAYER ===
      Player(ctx, newPlayer, keys[" "]); // space = punch

      // === UPDATE ENEMIES ===
      const updatedEnemies = enemies.map((e) => {
        e.x -= e.speed;
        if (e.x < -50) e.health = 0;
        return e;
      });

      // === COLLISION (Punch damage) ===
      if (keys[" "]) {
        updatedEnemies.forEach((e) => {
          if (Math.abs(e.x - newPlayer.x) < 40) {
            e.health -= 10;
            setScore((s) => s + 5);
          }
        });
      }

      // === ENEMY ATTACK ===
      updatedEnemies.forEach((e) => {
        if (Math.abs(e.x - newPlayer.x) < 30) {
          newPlayer.health -= 0.5;
        }
      });

      // Filter out dead enemies
      const alive = updatedEnemies.filter((e) => e.health > 0);
      setEnemies(alive);
      setPlayer(newPlayer);

      // Draw enemies
      alive.forEach((e) => Enemy(ctx, e));

      // === DRAW HUD ===
      HUD(ctx, score, newPlayer.health);

      // === GAME OVER ===
      if (newPlayer.health <= 0) {
        setGameOver(true);
      } else {
        requestAnimationFrame(loop);
      }
    };

    if (!gameOver) {
      requestAnimationFrame(loop);
    }
  }, [player, enemies, keys, gameOver, score]);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        width={900}
        height={500}
        style={{ background: "#f2f2f2", border: "2px solid #000" }}
      />
      {gameOver && <GameOver score={score} />}
    </div>
  );
};

export default GamePlay;