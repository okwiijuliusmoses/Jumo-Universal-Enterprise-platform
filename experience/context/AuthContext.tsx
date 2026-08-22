import React, { createContext, useContext, useState, useEffect } from 'react';
import { logMilestone } from '../../src/diagnostics/moduleTracer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'TENANT' | 'SECURITY' | 'DEVELOPER' | 'USER' | string;
  tenantId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (identifier: string, password?: string) => Promise<AuthUser>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  logMilestone('AUTH_PROVIDER_START', 'PASS');
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('jumo_current_user');
        return stored ? JSON.parse(stored) : null;
      }
    } catch {
      // ignore storage error
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (identifier: string, password?: string): Promise<AuthUser> => {
    setLoading(true);
    try {
      let role: AuthUser['role'] = 'TENANT';
      const idLower = identifier.toLowerCase();
      if (idLower.includes('owner') || idLower.includes('okwii') || idLower.includes('secops') || idLower.includes('system')) {
        role = 'OWNER';
      } else if (idLower.includes('security')) {
        role = 'SECURITY';
      } else if (idLower.includes('dev')) {
        role = 'DEVELOPER';
      }

      const newUser: AuthUser = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        name: identifier.split('@')[0] || 'Enterprise Administrator',
        email: identifier,
        role
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('jumo_current_user', JSON.stringify(newUser));
      }
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jumo_current_user');
      localStorage.removeItem('jumo_session_token');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
