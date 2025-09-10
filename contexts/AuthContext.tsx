'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  is_guest: boolean;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  sessionId: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  guestMode: (sessionId: string, userId: number) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    const storedSessionId = localStorage.getItem('session_id');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    if (storedSessionId) {
      setSessionId(storedSessionId);
    }

    setIsLoading(false);
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    setSessionId(null); // Clear guest session
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    localStorage.removeItem('session_id');
  };

  const guestMode = (newSessionId: string, userId: number) => {
    setToken(null);
    setUser({
      id: userId,
      username: `guest_${userId}`,
      email: '',
      is_guest: true,
      created_at: new Date().toISOString()
    });
    setSessionId(newSessionId);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.setItem('session_id', newSessionId);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setSessionId(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('session_id');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        sessionId,
        isLoading,
        login,
        guestMode,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
