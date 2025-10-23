// src/pages/SeasonSelect.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

/**
 * Season selector page - fetch seasons from api.getSeasons()
 * Displays list of seasons (title, description, start button)
 */

export default function SeasonSelect() {
  const [seasons, setSeasons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await api.getSeasons();
      setSeasons(res.seasons || []);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Choose a Season</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {seasons.map((s) => (
            <div key={s.id} className="p-4 bg-white/5 rounded">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-300">{s.description}</p>
              <div className="mt-3">
                <button onClick={() => navigate(`/seasons/${s.id}`)} className="px-3 py-2 bg-indigo-600 rounded">Open Season</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
