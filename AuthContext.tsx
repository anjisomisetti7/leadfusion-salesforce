import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string, remember: boolean) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = '/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check saved session
    const storedToken = localStorage.getItem('nexus_auth_token') || sessionStorage.getItem('nexus_auth_token');
    const storedUser = localStorage.getItem('nexus_auth_user') || sessionStorage.getItem('nexus_auth_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('nexus_auth_token');
        localStorage.removeItem('nexus_auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string, remember: boolean): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setToken(data.token);
      setUser(data.user);

      if (remember) {
        localStorage.setItem('nexus_auth_token', data.token);
        localStorage.setItem('nexus_auth_user', JSON.stringify(data.user));
      } else {
        sessionStorage.setItem('nexus_auth_token', data.token);
        sessionStorage.setItem('nexus_auth_user', JSON.stringify(data.user));
      }
      setIsLoading(false);
      return true;
    } catch (err: any) {
      setIsLoading(false);
      throw err;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setToken(data.token);
      setUser(data.user);

      localStorage.setItem('nexus_auth_token', data.token);
      localStorage.setItem('nexus_auth_user', JSON.stringify(data.user));
      setIsLoading(false);
      return true;
    } catch (err: any) {
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nexus_auth_token');
    localStorage.removeItem('nexus_auth_user');
    sessionStorage.removeItem('nexus_auth_token');
    sessionStorage.removeItem('nexus_auth_user');
  };

  const updateProfile = async (updatedData: Partial<User>): Promise<boolean> => {
    if (!token || !user) return false;
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      setUser(data.user);
      const storageKey = localStorage.getItem('nexus_auth_user') ? localStorage : sessionStorage;
      storageKey.setItem('nexus_auth_user', JSON.stringify(data.user));
      return true;
    } catch (err) {
      console.error('Update profile error:', err);
      // Fallback local update
      const merged = { ...user, ...updatedData };
      setUser(merged);
      return true;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
