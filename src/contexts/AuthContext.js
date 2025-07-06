import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      console.log("Checking auth status...");
      const response = await authAPI.getUser();
      console.log("Auth response:", response.data);

      if (response.data && response.data.code === 200) {
        setUser(response.data.data);
        setIsAuthenticated(true);
        console.log("User authenticated:", response.data.data);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log("Auth failed - no valid response");
      }
    } catch (error) {
      // User is not authenticated
      console.error("Auth check error:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      console.log("res+", response?.data);

      if (response.data.code === 200) {
        setUser(response.data.data);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        return { success: true };
      } else {
        toast.error(response.data.message || "Login failed");
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });

      if (response.data.code === 200) {
        toast.success("Registration successful! Please login.");
        return { success: true };
      } else {
        toast.error(response.data.message || "Registration failed");
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const googleLogin = async (credentialResponse) => {
    try {
      const response = await authAPI.googleLogin(credentialResponse.credential);

      if (response.data.code === 200) {
        setUser(response.data.data);
        setIsAuthenticated(true);
        toast.success("Google login successful!");
        return { success: true };
      } else {
        toast.error(response.data.message || "Google login failed");
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Google login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
