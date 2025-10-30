import { createContext, useState, useEffect } from "react";
import api from "../utils/api"; // <-- changed from "* as api" to default import

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("stickman_user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = async (form) => {
    try {
      setLoading(true);
      const data = await api.signup(form);

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

  const login = async (form) => {
    try {
      setLoading(true);
      const data = await api.login(form);

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
