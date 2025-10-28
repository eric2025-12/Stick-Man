// src/pages/SignupPage.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthorContext";
import HeroBanner from "../components/HeroBanner";
import signupBg from "../assets/backgrounds/Stickman-Arena-Showdown.png"; // can use same image

function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm((s) => ({
      ...s,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await signup(form);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.error || "Signup failed");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${signupBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#000",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <HeroBanner />

        <div className="w-full max-w-md p-6 bg-white/90 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
            Create Your Account
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
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="Email"
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
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}

          <div className="mt-4 flex justify-between items-center text-sm">
            <Link to="/login" className="text-indigo-600 hover:underline">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
