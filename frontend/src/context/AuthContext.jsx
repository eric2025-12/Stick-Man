// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// ✅ Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated login (you can replace with real API later)
  const login = async ({ username, password }) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
    setLoading(false);

    if (username === "admin" && password === "1234") {
      setUser({ username });
      return { success: true };
    } else if (username === "guest") {
      setUser({ username: "guest" });
      return { success: true };
    } else {
      return { success: false, error: "Invalid username or password" };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ This is the missing export your LoginPage.jsx expects
export function useAuth() {
  return useContext(AuthContext);
}