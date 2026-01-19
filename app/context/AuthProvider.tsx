import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listener Firebase - gerencia automaticamente a sessão
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Usuário autenticado
          setUser(firebaseUser);
          
          // Salvar UID para referência local
          await AsyncStorage.setItem('userId', firebaseUser.uid);
          await AsyncStorage.setItem('userEmail', firebaseUser.email || '');
        } else {
          // Usuário deslogou
          setUser(null);
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('userEmail');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe; // Cleanup
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userEmail');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
