// src/pages/SignupPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Signup page - simple registration form calling AuthContext.signup
 */

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
    if (res.success) navigate("/");
    else setError(res.error || "Signup failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: `url('/assets/backgrounds/login-bg.jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10 w-full max-w-md p-6 bg-white/90 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create an account</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full p-3 border rounded" required />
          <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" className="w-full p-3 border rounded" required />
          <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded" disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>
        {error && <div className="mt-2 text-red-600">{error}</div>}
        <div className="mt-3 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-600">Login</Link>
        </div>
      </div>
    </div>
  );
}
