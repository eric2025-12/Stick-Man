// src/pages/SignupPage.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HeroBanner from "../components/HeroBanner";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

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
      className="min-h-screen flex-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('/assets/backgrounds/signup-bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <HeroBanner />

      <div className="relative z-10 w-full max-w-md p-6 bg-white/90 rounded-lg shadow-lg fade-in">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" value={form.username} onChange={handleChange} required placeholder="Username" className="w-full p-3 rounded border" />
          <input name="password" value={form.password} onChange={handleChange} type="password" required placeholder="Password" className="w-full p-3 rounded border" />
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}

        <div className="mt-4 text-center text-sm">
          <Link to="/login" className="text-indigo-600 hover:underline">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}
