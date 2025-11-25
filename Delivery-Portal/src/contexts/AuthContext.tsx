import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/axios';

interface DeliveryUser {
  deliveryPersonId?: string;
  id?: string;
  role?: string;
  branchName?: string;
  email?: string;
  name?: string;
  vehicleNumber?: string;
  phone?: string;
  area?: string;
}

interface AuthContextType {
  user: DeliveryUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DeliveryUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem('deliveryToken');
    const userData = localStorage.getItem('deliveryUser');

    if (token) {
      // set default header so api immediately has auth for first request
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('deliveryToken');
        localStorage.removeItem('deliveryUser');
        delete api.defaults.headers.common.Authorization;
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/delivery/login', { email, password });

      // backend might return { token, user } or { token, ...userFields }
      const data = response.data;
      const token: string | undefined = data.token ?? data.accessToken ?? data.jwt;
      let userData: DeliveryUser | null = null;

      if (data.user) {
        userData = data.user;
      } else {
        // remove token from data if it's mixed
        const { token: _t, accessToken: _a, jwt: _j, ...rest } = data as any;
        // rest should represent user fields (id, email, role, etc.)
        userData = Object.keys(rest).length ? rest as DeliveryUser : null;
      }

      if (!token) {
        throw new Error('No token returned from server');
      }

      // persist and set defaults
      localStorage.setItem('deliveryToken', token);
      if (userData) {
        localStorage.setItem('deliveryUser', JSON.stringify(userData));
        setUser(userData);
      } else {
        localStorage.removeItem('deliveryUser');
        setUser(null);
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } catch (error) {
      // rethrow so caller (Login.tsx) catch block can show toast
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('deliveryToken');
    localStorage.removeItem('deliveryUser');
    setUser(null);
    delete api.defaults.headers.common.Authorization;
    // You may redirect to /login from caller or use location here:
    // window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
