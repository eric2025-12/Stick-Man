// src/pages/MainMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import menuBg from "../assets/backgrounds/Sticky.jpeg"; // ✅ your background image

export default function MainMenu() {
  return (
    <div
      className="min-h-screen flex-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${menuBg})` }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-50" />

      <HeroBanner />

      {/* Main menu card */}
      <div className="relative z-10 w-full max-w-md p-6 bg-white/90 rounded-lg shadow-lg fade-in text-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">StickQuest</h1>

        <div className="space-y-4">
          <Link to="/seasons">
            <button className="w-full p-3 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
              Play Game
            </button>
          </Link>

          <Link to="/profile">
            <button className="w-full p-3 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition">
              Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
