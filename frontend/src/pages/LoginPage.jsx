// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HeroBanner from "../components/HeroBanner";
import loginBg from "../assets/backgrounds/Stickman-Arena-Showdown.png"; // ✅ added image import

/**
 * Login page with large stickmen axes background.
 * Uses AuthContext.login to authenticate the user.
 */

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await login(form);
    if (res.success) {
      navigate("/"); // go to main menu
    } else {
      setError(res.error || "Login failed");
    }
  };

  const guestLogin = async () => {
    await login({ username: "Guest" });
    navigate("/");
  };

  return (
    // ✅ Updated outer div to use your local background image
    <div
      className="page-container flex items-center justify-center bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <HeroBanner />
      <div className="relative z-10 w-full max-w-md mx-auto p-6 bg-white/90 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome to StickQuest</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="Username"
            className="w-full p-3 rounded border"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            required
            placeholder="Password"
            className="w-full p-3 rounded border"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}

        <div className="mt-4 flex justify-between items-center text-sm">
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Create account
          </Link>
          <button onClick={guestLogin} className="text-gray-700 hover:underline">
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
