// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import HeroBanner from "../components/HeroBanner";
// ✅ Remove background reference or use a fallback color/image
// (If you add an image later, import it here)
// import loginBg from "../assets/login-bg.jpg";

function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await login(form);
    if (res.success) {
      navigate("/gameplay");
    } else {
      setError(res.error || "Login failed");
    }
  };

  // ✅ Guest login handler
  const guestLogin = async () => {
    const res = await login({ username: "guest" });
    if (res.success) {
      navigate("/gameplay");
    } else {
      setError(res.error || "Guest login failed");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a", // ✅ solid fallback color (no missing image)
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <HeroBanner />

        <div className="w-full max-w-md p-6 bg-white/90 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
            Welcome to StickQuest
          </h2>

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
            <button
              onClick={guestLogin}
              className="text-gray-700 hover:underline"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
