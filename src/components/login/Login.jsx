import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Button, Image, Alert } from 'react-native';
import axios, { API_URL } from '../../data/apiConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import UserContext from '../../data/userContext.js'
;
const LoginScreen = ({ updateUser, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userContext = useContext(UserContext);

  const isWeb = Platform.OS === 'web';
  const storage = isWeb ? localStorage : AsyncStorage;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico y contraseña');
      return;
    }
    try{
      const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
      const token = response.data.token;
      const userData = response.data.userData[0];
      await storage.setItem('token', token);
      userContext.updateUser(userData);
      
      navigation.navigate('Main');
      setEmail('');
      setPassword('');

    }
    catch(error){
      Alert.alert('error', error);
    }
  }

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyEstCalendar</Text>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Text> </Text>
      <Text style={styles.registerText}>¿No tienes cuenta aún?</Text>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.linkText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  registerText:{
    alignSelf: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'blue',
    paddingVertical: 10,
    fontSize: 16,
  },
  linkText: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 16,
  },
});

export default LoginScreen;