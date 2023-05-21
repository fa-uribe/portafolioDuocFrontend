import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, BackHandler, Alert } from 'react-native';
import moment from "moment/moment";
import CalendarScreen from "./CalendarScreen";
import CrearEventoForm from "./CrearEvento";
import UserContext from "../data/userContext.js";
import { useFocusEffect } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';

const Main = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventData, setEventData] = useState(null);

  const handleCrearEvento = () => {
    setModalVisible(true);
  };

  const handleFormSubmit = (evento) => {
    console.log(evento);
    setEventData(evento);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onBackPress = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        { text: "Cancelar", onPress: () => null, style: "cancel" },
        { text: "Salir", onPress: () => signOut() },
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        onBackPress();
      });

      return () => {
        navigation.removeListener('beforeRemove', (e) => {
          e.preventDefault();
          onBackPress();
        });
      };
    }, [])
  );

  const signOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error al limpiar el almacenamiento:', error);
    }
    updateUser(null);

    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text>Bienvenido, {user && user.username}</Text>
      <Text style={styles.title}>Mi calendario</Text>
      <CalendarScreen />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCrearEvento} style={styles.button}>
          <Text style={styles.buttonText}>Crear evento</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <CrearEventoForm onClose={closeModal} onSubmit={handleFormSubmit} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Main;