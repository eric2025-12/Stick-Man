// src/pages/ProfilePage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

/**
 * Profile page showing basic player info, progress, and badges.
 * Pulls from auth context and optionally fetches more profile details via api.getProfile().
 */

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.getProfile();
      setProfile(res.profile || { username: user?.username, coins: 0, badges: [] });
    })();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-white/5 p-4 rounded">
        <h2 className="text-2xl font-bold">Profile</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">{profile?.username || user?.username}</h3>
            <p className="text-sm text-gray-300">Coins: {profile?.coins ?? 0}</p>
            <p className="text-sm text-gray-300">Season: {user?.progress?.season ?? 1} / Level: {user?.progress?.level ?? 1}</p>
          </div>
          <div>
            <h4 className="font-semibold">Badges</h4>
            <div className="mt-2 flex gap-2">
              {(profile?.badges?.length ? profile.badges : ["Novice"]).map((b, i) => (
                <div key={i} className="px-2 py-1 bg-indigo-700 rounded text-sm">{b}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
