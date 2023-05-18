import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Button, Image } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/myEstCalendarAPI/auth/signin', { email, password });
      const token = response.data.token;
      
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

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

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.linkText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 150,
    height: 150,
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

