// frontend/src/context/AuthContext.tsx
"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from "@/lib/api";
import { User } from '@/types';



interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  updateAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const updateAuthStatus = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        const response = await api.post("/auth/me", { token: accessToken });
        setUser(response.data.user);
        console.log(response.data.user);
        
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error updating auth status:", error);
      setUser(null);
      setIsAuthenticated(false);
    }finally {
        setIsLoading(false);
    }

  };

  useEffect(() => {
    updateAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, updateAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};