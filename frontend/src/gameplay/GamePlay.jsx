import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";
import HUD from "./HUD";
import PauseMenu from "./PauseMenu";
import TrapAnimation from "./TrapAnimation";
import Enemy from "./Enemy";
import GameOver from "./GameOver";

const GamePlay = () => {
  const { score, health, increaseScore, decreaseHealth, resetGame } = useContext(GameContext);

  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 10, y: 0 });
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [trapTriggered, setTrapTriggered] = useState(false);
  const [enemies, setEnemies] = useState([]);

  // New states for enemy attack + player hit animation
  const [attackingEnemy, setAttackingEnemy] = useState(null);
  const [playerHit, setPlayerHit] = useState(false);

  const gravity = 0.6;
  const jumpForce = 12;
  const moveSpeed = 5;
  const groundLevel = 0;
  const flagPosition = { x: 90, y: 0 };
  const trapPositions = [30, 60];

  // 🎮 Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isPaused || levelComplete || isGameOver) return;

      if (e.key === "ArrowRight") {
        setPlayerPosition((pos) => ({ ...pos, x: Math.min(pos.x + moveSpeed, 100) }));
      } else if (e.key === "ArrowLeft") {
        setPlayerPosition((pos) => ({ ...pos, x: Math.max(pos.x - moveSpeed, 0) }));
      } else if ((e.key === " " || e.key === "ArrowUp") && !isJumping) {
        setVelocity(jumpForce);
        setIsJumping(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPaused, levelComplete, isJumping, isGameOver]);

  // 🪂 Gravity + Jump Logic
  useEffect(() => {
    if (isPaused || isGameOver) return;

    const interval = setInterval(() => {
      setPlayerPosition((pos) => {
        let newY = pos.y + velocity;
        let newVelocity = velocity - gravity;

        if (newY <= groundLevel) {
          newY = groundLevel;
          newVelocity = 0;
          setIsJumping(false);
        }

        setVelocity(newVelocity);
        return { ...pos, y: newY };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [velocity, isPaused, isGameOver]);

  // ⚠️ Trap Collision
  useEffect(() => {
    if (isGameOver) return;
    trapPositions.forEach((trapX) => {
      const distance = Math.abs(playerPosition.x - trapX);
      if (distance < 5 && playerPosition.y <= 5) handleTrapCollision();
    });
  }, [playerPosition, isGameOver]);

  const handleTrapCollision = () => {
    if (trapTriggered) return;
    setTrapTriggered(true);
    decreaseHealth();
    setTimeout(() => setTrapTriggered(false), 1500);
  };

  // 👾 Enemy Spawn & Movement
  useEffect(() => {
    if (isPaused || levelComplete || isGameOver) return;
    const spawnInterval = setInterval(() => {
      setEnemies((prev) => [...prev, { id: Date.now(), x: 100 }]);
    }, 4000);
    return () => clearInterval(spawnInterval);
  }, [isPaused, levelComplete, isGameOver]);

  useEffect(() => {
    if (isPaused || levelComplete || isGameOver) return;
    const moveInterval = setInterval(() => {
      setEnemies((prev) =>
        prev.map((enemy) => ({ ...enemy, x: enemy.x - 1.5 })).filter((enemy) => enemy.x > 0)
      );
    }, 50);
    return () => clearInterval(moveInterval);
  }, [isPaused, levelComplete, isGameOver]);

  // 💥 Enemy Collision & Attack
  useEffect(() => {
    enemies.forEach((enemy) => {
      const distance = Math.abs(playerPosition.x - enemy.x);
      if (distance < 5 && playerPosition.y <= 5) handleEnemyAttack(enemy);
    });
  }, [playerPosition, enemies]);

  const handleEnemyAttack = (enemy) => {
    if (attackingEnemy) return; // avoid multiple simultaneous attacks

    setAttackingEnemy(enemy.id);
    setPlayerHit(true);
    decreaseHealth();

    // Flash red on hit
    setTimeout(() => setPlayerHit(false), 300);

    // Remove enemy after attack animation
    setTimeout(() => {
      setEnemies((prev) => prev.filter((e) => e.id !== enemy.id));
      setAttackingEnemy(null);
    }, 1000);
  };

  // 🏁 Level Complete
  useEffect(() => {
    const distance = Math.abs(playerPosition.x - flagPosition.x);
    if (distance < 5 && !levelComplete) handleLevelComplete();
  }, [playerPosition]);

  const handleLevelComplete = () => {
    setLevelComplete(true);
    setShowFlagMessage(true);
    increaseScore();

    setTimeout(() => {
      setShowFlagMessage(false);
      setLevelComplete(false);
      resetGame();
      setPlayerPosition({ x: 10, y: 0 });
    }, 3000);
  };

  // 💀 Game Over
  useEffect(() => {
    if (health <= 0) {
      setIsGameOver(true);
      setIsPaused(true);
    }
  }, [health]);

  const handleRestart = () => {
    resetGame();
    setIsPaused(false);
    setIsGameOver(false);
    setEnemies([]);
    setPlayerPosition({ x: 10, y: 0 });
  };

  const togglePause = () => setIsPaused(!isPaused);

  // ----------------------------
  // VISUALS: Stickman + Platform + Flag
  // ----------------------------

  // Helper: stickman SVG (keeps size small, color changes when hit)
  const StickmanSVG = ({ hit = false }) => (
    <svg width="30" height="60" viewBox="0 0 30 60" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* head */}
      <circle cx="15" cy="10" r="6" fill={hit ? "#ff7b7b" : "#fff"} stroke="#000" strokeWidth="1" />
      {/* body */}
      <line x1="15" y1="16" x2="15" y2="34" stroke="#000" strokeWidth="2" />
      {/* arms */}
      <line x1="6" y1="24" x2="24" y2="24" stroke="#000" strokeWidth="2" />
      {/* left leg */}
      <line x1="15" y1="34" x2="8" y2="50" stroke="#000" strokeWidth="2" />
      {/* right leg */}
      <line x1="15" y1="34" x2="22" y2="50" stroke="#000" strokeWidth="2" />
    </svg>
  );

  // Helper: flag SVG
  const FlagSVG = ({ small = false }) => (
    <svg width={small ? 24 : 36} height={small ? 40 : 56} viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* pole */}
      <rect x="4" y="0" width="2" height="40" fill="#6b6b6b" />
      {/* flag */}
      <path d="M6 6 L18 10 L6 14 Z" fill="#ffcc00" stroke="#000" strokeWidth="0.5" />
    </svg>
  );

  // Render
  return (
    <div style={{ textAlign: "center", color: "#fff" }}>
      <HUD score={score} health={health} />

      {/* Game container */}
      <div
        style={{
          position: "relative",
          height: "360px",
          background: "linear-gradient(#87ceeb 0%, #87ceeb 60%, #88c070 60%, #88c070 100%)",
          overflow: "hidden",
          margin: "12px auto",
          width: "90%",
          maxWidth: "1100px",
          borderRadius: "8px",
          border: "2px solid rgba(0,0,0,0.2)",
        }}
      >
        {/* Decorative horizon / background elements (simple) */}
        <div style={{ position: "absolute", left: "6%", top: "12%", opacity: 0.15 }}>
          <svg width="160" height="80" viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="40" r="20" fill="#fff" />
            <circle cx="70" cy="30" r="14" fill="#fff" />
            <circle cx="110" cy="36" r="16" fill="#fff" />
          </svg>
        </div>

        {/* Platform / ground */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "70px",
            background: "linear-gradient(#6aa84f, #4a7a2b)",
            borderTop: "4px solid #3e6b22",
            boxShadow: "inset 0 6px 10px rgba(0,0,0,0.15)",
          }}
        />

        {/* Player (stickman) */}
        <div
          style={{
            position: "absolute",
            left: `${playerPosition.x}%`,
            bottom: `${playerPosition.y + 10}px`,
            width: "30px",
            height: "60px",
            transform: playerHit ? "translateY(-4px) scale(1.05)" : "translateY(0) scale(1)",
            transition: "transform 0.12s linear",
            pointerEvents: "none",
            // offset to center the SVG over the "player position" reference
            marginLeft: "-15px",
          }}
        >
          <StickmanSVG hit={playerHit} />
        </div>

        {/* Flag (level end) */}
        <div
          style={{
            position: "absolute",
            left: `${flagPosition.x}%`,
            bottom: "10px",
            width: "36px",
            height: "56px",
            marginLeft: "-18px",
            pointerEvents: "none",
          }}
        >
          <FlagSVG />
        </div>

        {/* Traps (static visible indicators) */}
        {trapPositions.map((tX, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: `${tX}%`,
              bottom: "10px",
              width: "40px",
              height: "18px",
              marginLeft: "-20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* simple spike graphic */}
            <svg width="40" height="18" viewBox="0 0 40 18" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="40" height="18" fill="#7a1f1f" rx="2" />
              <g fill="#f4c542">
                <path d="M2 18 L8 4 L14 18 Z" />
                <path d="M10 18 L16 4 L22 18 Z" />
                <path d="M18 18 L24 4 L30 18 Z" />
                <path d="M26 18 L32 4 L38 18 Z" />
              </g>
            </svg>
          </div>
        ))}

        {/* Enemies (keep previous visuals but slightly refined) */}
        {enemies.map((enemy) => (
          <div
            key={enemy.id}
            style={{
              position: "absolute",
              left: `${enemy.x}%`,
              bottom: "18px",
              width: "34px",
              height: "44px",
              marginLeft: "-17px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: attackingEnemy === enemy.id ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.18s ease, background-color 0.18s ease",
              pointerEvents: "none",
            }}
          >
            {/* simple enemy SVG */}
            <svg width="34" height="44" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="22" height="18" rx="6" fill={attackingEnemy === enemy.id ? "#c0392b" : "#e67e22"} stroke="#000" />
              <circle cx="12" cy="18" r="2.5" fill="#000" />
              <circle cx="22" cy="18" r="2.5" fill="#000" />
              <path d="M12 30 Q17 34 22 30" stroke="#000" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        ))}

        {/* Trap animation (appears when trapTriggered) */}
        {trapTriggered && <TrapAnimation x={playerPosition.x} />}

        {/* Level message */}
        {showFlagMessage && (
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)" }}>
            <div style={{ background: "rgba(0,0,0,0.6)", color: "#fff", padding: "8px 12px", borderRadius: 8 }}>
              🎉 Level Complete!
            </div>
          </div>
        )}

        {/* Pause / GameOver overlays */}
        {isPaused && !isGameOver && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <PauseMenu onResume={togglePause} />
          </div>
        )}

        {isGameOver && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GameOver score={score} onRestart={handleRestart} />
          </div>
        )}
      </div>

      {/* Controls (unchanged) */}
      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <button onClick={() => setPlayerPosition({ x: playerPosition.x + 5, y: playerPosition.y })}>➡️ Move Right</button>
        <button onClick={() => setPlayerPosition({ x: playerPosition.x - 5, y: playerPosition.y })}>⬅️ Move Left</button>
        <button onClick={() => !isJumping && setVelocity(jumpForce)}>⬆️ Jump</button>
        <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
      </div>
    </div>
  );
};

export default GamePlay;
