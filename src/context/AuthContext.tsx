// src/context/AuthContext.tsx
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [, setLocation] = useLocation(); // Usar setLocation para la redirección

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem('user', username);
    setLocation('/canciones'); // Redirigir a una ruta protegida
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setLocation('/login'); // Redirigir al login
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
