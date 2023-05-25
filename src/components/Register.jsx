import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from '../data/apiConfig.js';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [career, setCareer] = useState('');
  const [careersList, setCareersList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/myEstCalendarAPI/career/careerList')
      .then(response => {
        setCareersList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    try {
        if (!email || !password || !career) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Por favor, ingresa un email válido');
            return;
        }

        else {
            const registerUser = await axios.post('http://localhost:8080/myEstCalendarAPI/auth/signup', { username, email, password, career });
            
            navigation.navigate('Main');
            setUsername('');
            setEmail('');
            setPassword('');
            setCareer('');
        }
 
    } catch (error) {
        Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Picker
        style={styles.input}
        selectedValue={career}
        onValueChange={itemValue => setCareer(itemValue)}
        >
        <Picker.Item label="Selecciona una carrera" value="" />
        {careersList.map(career => (
            <Picker.Item key={career._id} label={career.career_name} value={career.career_name} />
        ))}
      </Picker>
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;
