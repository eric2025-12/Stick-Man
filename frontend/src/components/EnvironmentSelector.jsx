// src/components/EnvironmentSelector.jsx
import React from "react";

/**
 * Small UI widget to preview environment/time of day.
 * Used on MainMenu or LevelSelect to preview season visuals.
 */

export default function EnvironmentSelector({ current = "city", onChange }) {
  const options = [
    { id: "city", label: "City" },
    { id: "forest", label: "Forest" },
    { id: "desert", label: "Desert" },
  ];
  return (
    <div className="flex gap-2 items-center">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange && onChange(o.id)}
          className={`px-3 py-1 rounded ${current === o.id ? "bg-indigo-600" : "bg-white/10"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}