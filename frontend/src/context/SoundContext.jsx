// src/context/SoundContext.jsx
import { createContext, useState, useEffect, useRef } from "react";

const SoundContext = createContext();

export function SoundProvider({ children }) {
    const [isMuted, setIsMuted] = useState(false);
    const bgMusic = useRef(new Audio("/sounds/background.mp3"));

    useEffect(() => {
        bgMusic.current.loop = true;
        if (!isMuted) {
            bgMusic.current.play().catch(() => {});
        } else {
            bgMusic.current.pause();
        }
    }, [isMuted]);

    function toggleMute() {
        setIsMuted(prev => !prev);
    }

    function playSFX(soundPath) {
        if (isMuted) return;
        const sfx = new Audio(soundPath);
        sfx.play();
    }

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playSFX }}>
            {children}
        </SoundContext.Provider>
    );
}

export default SoundContext;