import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

const getToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem('token');
  } else {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      return null;
    }
  }
};

axios.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export default axios;

export const API_URL = 'http://ec2-52-67-153-193.sa-east-1.compute.amazonaws.com:8080/myEstCalendarAPI';