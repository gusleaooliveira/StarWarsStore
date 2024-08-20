import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://c71631bb2459ee935fd9cbbf853e3c4d.serveo.net',  // Substitua pelo URL da sua API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  console.log('token', token);
  
  if (!!token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
