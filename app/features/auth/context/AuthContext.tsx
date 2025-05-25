import { createContext, useContext, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  setToken: (token: string) => Promise<void>;
  getToken: () => Promise<string | null>;
  clearToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const setToken = async (token: string) => {
    if (Platform.OS == 'web') {
      localStorage.setItem('auth_token', token);
    } else {
      await SecureStore.setItemAsync('auth_token', token);
    }
  };

  const getToken = async () => {
    if (Platform.OS === 'web') {
      return localStorage.getItem('auth_token');
    } else {
      return await SecureStore.getItemAsync('auth_token');
    }
  };

  const clearToken = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem('auth_token');
    } else {
      await SecureStore.deleteItemAsync('auth_token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, setToken, getToken, clearToken }}>
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
