// src/pages/LevelSelect.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

/**
 * Shows the five levels for a selected season and whether they are locked/unlocked.
 * For demo: levels are all selectable.
 */

export default function LevelSelect() {
  const { seasonId } = useParams();
  const [levels, setLevels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // For demo we generate 5 level entries and fetch details
    const load = async () => {
      const arr = await Promise.all([1,2,3,4,5].map(async (i) => {
        const res = await api.getLevel(i);
        return { id: i, title: res.title || `Level ${i}`, difficulty: res.difficulty || i };
      }));
      setLevels(arr);
    };
    load();
  }, [seasonId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Season {seasonId} — Select Level</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {levels.map((lvl) => (
            <div key={lvl.id} className="p-3 bg-white/5 rounded">
              <h4 className="font-semibold">{lvl.title}</h4>
              <p className="text-sm text-gray-300">Difficulty: {lvl.difficulty}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => navigate(`/game/${seasonId}/${lvl.id}`)} className="px-2 py-1 bg-indigo-600 rounded">Play</button>
                <button onClick={() => navigate("/")} className="px-2 py-1 bg-gray-600 rounded">Back</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
