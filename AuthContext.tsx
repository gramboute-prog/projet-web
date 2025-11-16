import React, { createContext, useContext, useState, useEffect } from 'react';

// Définir les types localement pour éviter les problèmes d'import
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string; // Optionnel pour la rétrocompatibilité
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulation de connexion
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData: User = {
            id: '1',
            email: email,
            firstName: email.split('@')[0], // Utilise la partie avant @ comme prénom
            lastName: 'Utilisateur'
          };
          
          setUser(userData);
          localStorage.setItem('authToken', 'fake-jwt-token');
          localStorage.setItem('userData', JSON.stringify(userData));
          resolve();
        } else {
          reject(new Error('Email et mot de passe requis'));
        }
      }, 1000);
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<void> => {
    // Simulation d'inscription
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && firstName && lastName) {
          const userData: User = {
            id: Date.now().toString(),
            email: email,
            firstName: firstName,
            lastName: lastName
          };
          
          setUser(userData);
          localStorage.setItem('authToken', 'fake-jwt-token');
          localStorage.setItem('userData', JSON.stringify(userData));
          resolve();
        } else {
          reject(new Error('Tous les champs sont requis'));
        }
      }, 1000);
    });
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  if (loading) {
    return (
      <div className="loading-girly">
        <div className="spinner-girly"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
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