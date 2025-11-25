// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// interface User {
//   name: string;
//   managerId: string;
//   email: string;
//   role: string;
//   branchName: string;
//   fullName?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (data: SignupData) => Promise<void>;
//   logout: () => void;
//   loading: boolean;
// }

// interface SignupData {
//   fullName: string;
//   email: string;
//   password: string;
//   branchName: string;
//   documents: FileList | null;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
    
//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//     }
    
//     setLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post('/api/manager/login', { email, password });
//       const { token: newToken, user: userData } = response.data;
      
//       setToken(newToken);
//       setUser(userData);
      
//       localStorage.setItem('token', newToken);
//       localStorage.setItem('user', JSON.stringify(userData));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   const signup = async (data: SignupData) => {
//     try {
//       const formData = new FormData();
//       formData.append('fullName', data.fullName);
//       formData.append('email', data.email);
//       formData.append('password', data.password);
//       formData.append('branchName', data.branchName);
      
//       if (data.documents) {
//         Array.from(data.documents).forEach((file) => {
//           formData.append('documents', file);
//         });
//       }

//       const response = await axios.post('/api/manager/signup', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const { token: newToken, user: userData } = response.data;
      
//       setToken(newToken);
//       setUser(userData);
      
//       localStorage.setItem('token', newToken);
//       localStorage.setItem('user', JSON.stringify(userData));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Signup error:', error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     delete axios.defaults.headers.common['Authorization'];
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  managerId: string;
  email: string;
  branchName: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  branchName: string;
  documents: FileList | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'https://everydaynewsbackend.onrender.com/api/manager/login',
        { email, password }
      );
      const userData = response.data.user;

      // Store user in localStorage
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('branchName', data.branchName);

      if (data.documents) {
        Array.from(data.documents).forEach((file) => formData.append('documents', file));
      }

      const response = await axios.post(
        'https://everydaynewsbackend.onrender.com/api/manager/signup',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const userData = response.data.user;
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);

      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_data');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
