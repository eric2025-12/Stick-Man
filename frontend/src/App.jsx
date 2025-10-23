// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // removed Router import
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainMenu from "./pages/MainMenu";
import SeasonSelect from "./pages/SeasonSelect";
import LevelSelect from "./pages/LevelSelect";
import GamePlay from "./pages/GamePlay";
import LevelComplete from "./pages/LevelComplete";
import ProfilePage from "./pages/ProfilePage";

/**
 * Basic protected route wrapper
 */
function ProtectedRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seasons"
          element={
            <ProtectedRoute>
              <SeasonSelect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seasons/:seasonId"
          element={
            <ProtectedRoute>
              <LevelSelect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game/:seasonId/:levelId"
          element={
            <ProtectedRoute>
              <GamePlay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level-complete"
          element={
            <ProtectedRoute>
              <LevelComplete />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
