import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';
import { initializeSocket, disconnectSocket } from '@/lib/socket';

interface User {
  userId: string;
  role: string;
  email: string;
  name?: string;
  branchName?: string; // Only for managers
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        
        // Check if token expired
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          const userData: User = {
            userId: decoded.userId,
            role: decoded.role,
            email: decoded.email,
            name: decoded.name,
            ...(decoded.branchName && { branchName: decoded.branchName }), // Include only if exists
          };

          setToken(storedToken);
          setUser(userData);
          initializeSocket(storedToken);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
  try {
    // Clear old session first
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    disconnectSocket();
    setUser(null);
    setToken(null);

    // Decode the new token
    const decoded: any = jwtDecode(newToken);

    const userData: User = {
      userId: decoded.userId,
      role: decoded.role,
      email: decoded.email,
      name: decoded.name,
      ...(decoded.branchName && { branchName: decoded.branchName }),
    };

    // Save new session
    localStorage.setItem('jwt_token', newToken);
    localStorage.setItem('user_data', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);

    initializeSocket(newToken);
  } catch (error) {
    console.error('Failed to decode token:', error);
  }
};


  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    setToken(null);
    setUser(null);
    disconnectSocket();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
