import {AsyncStorage} from 'react-native';
import axios from 'axios';
import { Platform } from 'react-native';

// Obtener el token del almacenamiento local
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

// Configurar el interceptor para agregar el encabezado de autorización
axios.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export default axios;