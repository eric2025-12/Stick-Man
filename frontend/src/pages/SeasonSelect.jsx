// src/pages/SeasonSelect.jsx
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";

export default function SeasonSelect() {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.getSeasons();
      setSeasons(res.seasons || []);
    })();
  }, []);

  return (
    <div
  className="min-h-screen w-full h-screen flex-center bg-cover bg-center relative"
  style={{ backgroundImage: `url('/assets/backgrounds/Sticky.jpeg')` }}
>

      <div className="absolute inset-0 bg-black opacity-50" />
      <HeroBanner />

      <div className="relative z-10 w-full max-w-3xl p-6 bg-white/90 rounded-lg shadow-lg fade-in">
        <h2 className="text-2xl font-bold text-center mb-4">Select a Season</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {seasons.map((s) => (
            <Link key={s.id} to={`/seasons/${s.id}`}>
              <div className="p-4 bg-indigo-600 text-white rounded-lg text-center hover:bg-indigo-700 cursor-pointer">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
