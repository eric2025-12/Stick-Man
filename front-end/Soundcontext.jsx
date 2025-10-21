// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Load user data from localStorage when app starts
    useEffect(() => {
        const savedUser = localStorage.getItem("stickman_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    function login(username) {
        const newUser = { username };
        setUser(newUser);
        localStorage.setItem("stickman_user", JSON.stringify(newUser));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("stickman_user");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
