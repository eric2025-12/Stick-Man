// src/pages/LevelComplete.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";

export default function LevelComplete() {
  return (
    <div
      className="min-h-screen flex-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('/assets/backgrounds/level-complete-bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <HeroBanner />

      <div className="relative z-10 w-full max-w-md p-6 bg-white/90 rounded-lg shadow-lg fade-in text-center">
        <h2 className="text-2xl font-bold mb-4">Level Complete!</h2>
        <p className="mb-4">Congratulations! You’ve finished this level.</p>
        <Link to="/seasons">
          <button className="w-full">Back to Seasons</button>
        </Link>
      </div>
    </div>
  );
}
