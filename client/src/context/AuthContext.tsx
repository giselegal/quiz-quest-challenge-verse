
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  userName: string;
  id?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userName: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUser({ userName: savedUserName });
    }
  }, []);

  const login = (userName: string) => {
    const newUser: User = { userName };
    setUser(newUser);
    localStorage.setItem('userName', userName);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userName');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
