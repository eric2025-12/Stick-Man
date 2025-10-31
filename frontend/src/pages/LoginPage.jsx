import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import HeroBanner from "../components/HeroBanner";
import loginBg from "../assets/backgrounds/Stickman-Arena-Showdown.png";

function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm((s) => ({
      ...s,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await login(form);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.error || "Login failed");
    }
  };

  const guestLogin = async () => {
    setError(null);
    const res = await login({ username: "Guest" });
    if (res.success) {
      navigate("/");
    } else {
      setError(res.error || "Guest login failed");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        <HeroBanner />

        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={guestLogin}
          className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded font-semibold transition"
        >
          Continue as Guest
        </button>

        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
