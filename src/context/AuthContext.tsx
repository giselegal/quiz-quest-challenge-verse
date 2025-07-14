
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { safeLocalStorage } from '@/utils/safeLocalStorage';

interface User {
  userName: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do usuário na inicialização
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedName = safeLocalStorage.getItem('userName');
        const savedEmail = safeLocalStorage.getItem('userEmail');
        const savedRole = safeLocalStorage.getItem('userRole');
        
        if (savedName) {
          const userData: User = { userName: savedName };
          
          if (savedEmail) userData.email = savedEmail;
          if (savedRole) userData.role = savedRole;
          
          setUser(userData);
          console.log('✅ Dados do usuário carregados:', userData);
        } else {
          console.log('📝 Nenhum usuário logado encontrado');
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados do usuário:', error);
        // Limpar dados corrompidos
        safeLocalStorage.removeItem('userName');
        safeLocalStorage.removeItem('userEmail');
        safeLocalStorage.removeItem('userRole');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = (name: string, email?: string) => {
    try {
      const userData: User = { userName: name };
      
      if (email) {
        userData.email = email;
        safeLocalStorage.setItem('userEmail', email);
      }
      
      // Preservar o status de admin caso exista
      const savedRole = safeLocalStorage.getItem('userRole');
      if (savedRole) {
        userData.role = savedRole;
      }
      
      setUser(userData);
      safeLocalStorage.setItem('userName', name);
      
      console.log('✅ Usuário logado:', userData);
    } catch (error) {
      console.error('❌ Erro ao fazer login:', error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      safeLocalStorage.removeItem('userName');
      safeLocalStorage.removeItem('userEmail');
      safeLocalStorage.removeItem('userRole');
      
      console.log('✅ Usuário deslogado');
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
