import { createContext, useContext, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { LoginCredentials } from '../types';
import * as api from '../api';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  getToken: () => Promise<string | null>;
  signUp: (credentials: LoginCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
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

  const signUp = async (credentials: LoginCredentials): Promise<void> => {
    const res = await api.signUp(credentials);
    await setToken(res.token);
    setUser(res.user);
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    const res = await api.login(credentials);
    await setToken(res.token);
    setUser(res.user);
  };

  const logout = async (): Promise<void> => {
    const token = await getToken();
    if (!token) {
      return;
    }
    await api.logout(token);
    await clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, getToken, signUp, login, logout }}>
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
