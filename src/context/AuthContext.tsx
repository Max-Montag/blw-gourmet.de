"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { getCookie } from "@/utils/Utils";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  loggingIn: boolean;
  username: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  logout: async () => {},
  loading: true,
  loggingIn: false,
  username: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const checkAuth = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/user/`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Nicht authentifiziert");

      const data = await response.json();
      setIsAuthenticated(true);
      setUsername(data.username);
      setIsAdmin(data.is_admin);
    } catch (error) {
      setIsAuthenticated(false);
      setUsername(null);
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
      setLoggingIn(true);
      setLoading(true);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(`${apiUrl}/auth/login/`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "X-CSRFToken": getCookie("csrftoken") ?? "",
        },
      });

      if (!response.ok) throw new Error("Login fehlgeschlagen");

      await checkAuth();
    } catch (error) {
      throw new Error("Fehler beim Anmelden");
    } finally {
      setLoggingIn(false);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/auth/logout/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": getCookie("csrftoken") ?? "",
        },
      });

      if (!response.ok) throw new Error("Logout fehlgeschlagen");
    } catch (error) {
      console.error("Fehler beim Abmelden");
    } finally {
      setIsAuthenticated(false);
      setUsername(null);
      setIsAdmin(false);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        login,
        logout,
        loading,
        loggingIn,
        username: username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
