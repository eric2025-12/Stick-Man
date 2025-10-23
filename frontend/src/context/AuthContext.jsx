// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

/**
 * Simple AuthContext for development and UI flow.
 * - Stores current user in localStorage so progress persists across reloads.
 * - Provides login, signup, logout helper wrappers calling the api module.
 *
 * Replace network calls with real API calls in `api.js`.
 */

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("stick_user")) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Persist user to localStorage
    if (user) localStorage.setItem("stick_user", JSON.stringify(user));
    else localStorage.removeItem("stick_user");
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Use api.login in real integration; for now mimic success
      // const res = await api.login(credentials);
      // setUser(res.user);
      // Simulated:
      const res = {
        user: {
          id: credentials.username || "guest",
          username: credentials.username || "Guest",
          token: "demo-token",
          progress: { season: 1, level: 1 },
        },
      };
      setUser(res.user);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message || "Login failed" };
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      // Replace with api.signup
      const res = {
        user: {
          id: payload.username,
          username: payload.username,
          token: "demo-token",
          progress: { season: 1, level: 1 },
        },
      };
      setUser(res.user);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message || "Signup failed" };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProgress = (progress) => {
    // merge progress into user and persist
    setUser((prev) => {
      const next = { ...(prev || {}), progress: { ...(prev?.progress || {}), ...progress } };
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProgress }}>
      {children}
    </AuthContext.Provider>
  );
}
