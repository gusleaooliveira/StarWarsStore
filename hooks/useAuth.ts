import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import apiService from '@/service/apiService';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
       
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    };
    loadStoredUser();
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try { 
      
      const data = await apiService.login(email, password);

      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const signOut = async () => {
    setUser(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('userToken');
    router.replace('/login'); // Navega para a tela de login após logout
  };

  return {
    user,
    isLoggedIn,
    signIn,
    signOut,
  };
}
