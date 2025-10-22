// src/context/GameContext.jsx
import { createContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lives, setLives] = useState(3);
    const [gameState, setGameState] = useState("menu"); 
    // "menu" | "playing" | "paused" | "gameover"

    function startGame() {
        setScore(0);
        setLives(3);
        setLevel(1);
        setGameState("playing");
    }

    function pauseGame() {
        setGameState("paused");
    }

    function resumeGame() {
        setGameState("playing");
    }

    function endGame() {
        setGameState("gameover");
    }

    function increaseScore(amount = 10) {
        setScore(prev => prev + amount);
    }

    function nextLevel() {
        setLevel(prev => prev + 1);
    }

    return (
        <GameContext.Provider value={{
            score,
            level,
            lives,
            gameState,
            startGame,
            pauseGame,
            resumeGame,
            endGame,
            increaseScore,
            nextLevel
        }}>
            {children}
        </GameContext.Provider>
    );
}

export default GameContext;
