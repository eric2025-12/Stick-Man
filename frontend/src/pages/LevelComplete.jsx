// src/pages/LevelComplete.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * LevelComplete screen shows stats and offers next actions:
 * - Next Level (if available)
 * - Replay Level
 * - Go to Seasons (main selection)
 */

export default function LevelComplete() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // state may contain { seasonId, levelId, score }
  const seasonId = state?.seasonId || 1;
  const levelId = state?.levelId || 1;
  const score = state?.score || 0;

  const nextLevel = Number(levelId) + 1;
  const isLastLevelOfSeason = nextLevel > 5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-6">
      <div className="bg-white/5 p-6 rounded shadow max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Level Complete!</h2>
        <p className="mb-4">Score: <span className="font-mono">{score}</span></p>
        <div className="space-y-3">
          {!isLastLevelOfSeason ? (
            <button onClick={() => navigate(`/game/${seasonId}/${nextLevel}`)} className="w-full py-2 bg-indigo-600 rounded">Next Level</button>
          ) : (
            <button onClick={() => navigate(`/seasons/${Number(seasonId) + 1}`)} className="w-full py-2 bg-yellow-600 rounded">Proceed to Next Season</button>
          )}
          <button onClick={() => navigate(`/game/${seasonId}/${levelId}`)} className="w-full py-2 bg-gray-700 rounded">Replay Level</button>
          <button onClick={() => navigate("/seasons")} className="w-full py-2 bg-gray-600 rounded">Back to Seasons</button>
        </div>
      </div>
    </div>
  );
}
