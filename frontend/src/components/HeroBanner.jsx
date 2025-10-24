// src/components/HeroBanner.jsx
import React from "react";

/**
 * Simple top banner component with subtle animation.
 * Used on Login and MainMenu for consistent branding.
 */

export default function HeroBanner() {
  return (
    <div className="absolute top-6 left-6 z-20">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse">
          SQ
        </div>
        <div>
          <div className="text-white font-bold">StickQuest</div>
          <div className="text-xs text-gray-300">Seasons of Battle</div>
        </div>
      </div>
    </div>
  );
}
