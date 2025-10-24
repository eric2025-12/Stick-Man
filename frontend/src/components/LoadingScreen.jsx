// src/components/LoadingScreen.jsx
import React from "react";

/**
 * Loading screen shown while pages fetch data.
 */

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="mb-4">Loading...</div>
        <div className="w-24 h-2 bg-white/20 rounded overflow-hidden">
          <div className="h-full bg-indigo-500 animate-loading" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  );
}
