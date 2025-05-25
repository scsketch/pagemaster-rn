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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const setToken = async (token: string) => {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync('auth_token', token);
    }
  };

  const getToken = async () => {
    if (Platform.OS !== 'web') {
      return await SecureStore.getItemAsync('auth_token');
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, setToken, getToken }}>
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
