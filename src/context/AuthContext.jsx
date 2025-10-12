import React, { createContext, useState } from "react";
import { createAxiosInstance } from "../utils/AxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", accessToken);
  };

  const logout = async () => {
    try {
      const axiosInstance = createAxiosInstance({
        accessToken: token,
        refreshToken,
        logout: () => {},
      });
      await axiosInstance.post(
        "api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  // Function to refresh token
  const refreshToken = async () => {
    try {
      const res = await fetch(
        (import.meta.env.VITE_API_URL ||
          " https://farmtrack-api.onrender.com") + "/api/auth/refresh-token",
        { method: "POST", credentials: "include" }
      );
      const data = await res.json();
      if (data?.accessToken) {
        setToken(data.accessToken);
        localStorage.setItem("token", data.accessToken);
        return data.accessToken;
      }
      return null;
    } catch (err) {
      console.error("Refresh token failed:", err);
      return null;
    }
  };

  // Create axios instance using current state
  const axiosInstance = createAxiosInstance({
    accessToken: token,
    refreshToken,
    logout,
  });

  return (
    <AuthContext.Provider value={{ user, token, login, logout, axiosInstance }}>
      {children}
    </AuthContext.Provider>
  );
};
