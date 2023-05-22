import {AsyncStorage} from 'react-native';
import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const getToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem('token');
  } else {
    try {
      const token = await SecureStore.getItemAsync('token');
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