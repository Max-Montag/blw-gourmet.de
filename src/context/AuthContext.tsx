"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  user: any;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  logout: async () => {},
  loading: true,
  user: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  axios.defaults.withCredentials = true;

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/auth/user/");
      setIsAuthenticated(true);
      setUser(response.data);
      setIsAdmin(response.data.is_admin);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await axios.post("/api/auth/login/", { email, password });
      await checkAuth();
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout/");
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, login, logout, loading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
