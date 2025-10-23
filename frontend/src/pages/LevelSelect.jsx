// src/pages/LevelSelect.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import HeroBanner from "../components/HeroBanner";

export default function LevelSelect() {
  const { seasonId } = useParams();
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.getSeasons();
      const season = res.seasons.find((s) => s.id.toString() === seasonId);
      setLevels([...Array(season?.levels || 0)].map((_, i) => ({ id: i + 1 })));
    })();
  }, [seasonId]);

  return (
    <div
      className="min-h-screen flex-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('/assets/backgrounds/level-select-bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <HeroBanner />

      <div className="relative z-10 w-full max-w-3xl p-6 bg-white/90 rounded-lg shadow-lg fade-in">
        <h2 className="text-2xl font-bold text-center mb-4">Select Level</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {levels.map((l) => (
            <Link key={l.id} to={`/game/${seasonId}/${l.id}`}>
              <div className="p-4 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 cursor-pointer">
                Level {l.id}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
