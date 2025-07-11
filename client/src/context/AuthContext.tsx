
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  userName: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recuperar dados do usuário do localStorage
    const savedUser = localStorage.getItem('user');
    const userName = localStorage.getItem('userName');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    } else if (userName) {
      setUser({ id: 'temp', userName });
    }
    
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userName', userData.userName);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login,
      logout,
      isLoading
    }}>
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
