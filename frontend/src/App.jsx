// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { AuthProvider } from "./context/AuthContext"; // ✅ import AuthProvider
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GamePlay from "./gameplay/GamePlay";

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Game page */}
          <Route path="/gameplay" element={<GamePlay />} />
        </Routes>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;

