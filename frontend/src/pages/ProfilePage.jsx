// src/pages/ProfilePage.jsx
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthorContext";
import api from "../utils/api";
import HeroBanner from "../components/HeroBanner";

/**
 * Profile page showing player info, progress, and badges.
 * Styled consistently with other pages: centered content, background, and fade-in.
 */

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.getProfile();
      setProfile(
        res.profile || { username: user?.username, coins: 0, badges: [] }
      );
    })();
  }, [user]);

  return (
    <div
      className="min-h-screen flex-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('/assets/backgrounds/profile-bg.jpg')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Hero banner */}
      <HeroBanner />

      {/* Profile content */}
      <div className="relative z-10 w-full max-w-3xl p-6 bg-white/90 rounded-lg shadow-lg fade-in">
        <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg">
              {profile?.username || user?.username}
            </h3>
            <p className="text-sm text-gray-300">Coins: {profile?.coins ?? 0}</p>
            <p className="text-sm text-gray-300">
              Season: {user?.progress?.season ?? 1} / Level:{" "}
              {user?.progress?.level ?? 1}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg">Badges</h4>
            <div className="mt-2 flex gap-2 flex-wrap">
              {(profile?.badges?.length ? profile.badges : ["Novice"]).map((b, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-indigo-700 rounded text-sm text-white"
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;