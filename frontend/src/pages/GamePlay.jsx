// src/pages/GamePlay.jsx
import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthorContext"; // ✅ Make sure this matches your actual file

import LoadingScreen from "../components/LoadingScreen";

/**
 * Minimal gameplay page skeleton.
 * Real gameplay logic will be in GameCanvas.
 * This page controls lifecycle: load level, start, and mark completion.
 */

function GamePlay() {
  const { seasonId, levelId } = useParams();
  const { user, updateProgress } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [levelInfo, setLevelInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res2 = { title: `Level ${levelId}`, difficulty: Number(levelId) }; // mocked data
      if (!mounted) return;
      setLevelInfo(res2);
      setLoading(false);
    })();
    return () => (mounted = false);
  }, [levelId]);

  const handleLevelComplete = () => {
    updateProgress({ season: Number(seasonId), level: Number(levelId) });
    navigate("/level-complete", { state: { seasonId, levelId, score: 1000 } });
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{levelInfo.title}</h2>
          <div>
            <button onClick={() => navigate(-1)} className="px-2 py-1 bg-gray-700 rounded">
              Exit
            </button>
          </div>
        </div>

        {/* Placeholder for actual game canvas */}
        <div className="bg-white/5 rounded h-[420px] flex items-center justify-center">
          <div className="text-center">
            <p className="mb-3">[GameCanvas placeholder — implement GameCanvas.jsx later]</p>
            <p className="text-sm text-gray-300">Level difficulty: {levelInfo.difficulty}</p>
            <div className="mt-4 space-x-2">
              <button onClick={handleLevelComplete} className="px-3 py-2 bg-green-600 rounded">
                Simulate Win (Capture Flag)
              </button>
              <button onClick={() => {}} className="px-3 py-2 bg-red-600 rounded">
                Simulate Death
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default GamePlay;
=======
export default GamePlay;
>>>>>>> origin/michael
