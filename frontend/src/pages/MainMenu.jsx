// src/pages/MainMenu.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HeroBanner from "../components/HeroBanner";

/**
 * Simple Main Menu with Play (seasons), Profile, and Settings
 */

export default function MainMenu() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HeroBanner />
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">StickQuest</h1>
            <p className="text-sm text-gray-300">Seasoned fighters only</p>
          </div>
          <div className="text-right">
            <div className="text-sm">Hello, <span className="font-semibold">{user?.username}</span></div>
            <div className="mt-1">
              <button onClick={() => navigate("/profile")} className="mr-3 px-3 py-1 bg-gray-700 rounded">Profile</button>
              <button onClick={logout} className="px-3 py-1 bg-red-600 rounded">Logout</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 p-6 bg-white/5 rounded shadow">
            <h2 className="text-xl mb-2">Play</h2>
            <p className="text-sm text-gray-300 mb-4">Fight your way through seasons and claim the victory flag.</p>
            <button onClick={() => navigate("/seasons")} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded">Play Seasons</button>
          </div>

          <div className="p-6 bg-white/5 rounded shadow">
            <h3 className="font-semibold">Quick Actions</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><button onClick={() => navigate("/profile")} className="text-indigo-400 hover:underline">Open Profile</button></li>
              <li><button onClick={() => navigate("/level-complete")} className="text-indigo-400 hover:underline">Test Level Complete</button></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
