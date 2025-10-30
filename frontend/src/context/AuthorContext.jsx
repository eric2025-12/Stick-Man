// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import * as api from "../utils/api"; // your real API wrapper

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load user and token from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("stickman_user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Signup function
  const signup = async (form) => {
    try {
      setLoading(true);
      const data = await api.signup(form); // POST to /api/auth/signup

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("stickman_user", JSON.stringify(data.user));
        setUser(data.user);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: data.error || "Signup failed" };
      }
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Login function
  const login = async (form) => {
    try {
      setLoading(true);
      const data = await api.login(form); // POST to /api/auth/login

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("stickman_user", JSON.stringify(data.user));
        setUser(data.user);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("stickman_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
