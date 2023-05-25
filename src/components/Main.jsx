import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, BackHandler, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import moment from "moment/moment";
import axios, { API_URL } from "../data/apiConfig.js";

import UserContext from "../data/userContext.js";
import CalendarScreen from "./CalendarScreen.jsx";
import CrearEventoForm from "./CreateEvent.jsx";
import EventList from './EventList.jsx';

const Main = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [eventosDelDia, setEventosDelDia] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    obtenerEventos();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isModalVisible) {
        closeModal();
        return true;
      } else {
        Alert.alert(
          'Cerrar sesión',
          '¿Estás seguro de que deseas cerrar sesión?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Salir',
              onPress: () => {
                signOut();
              },
            },
          ],
          { cancelable: false }
        );
        return true;
      }
    });

    return () => backHandler.remove();
  }, [isModalVisible]);

  const obtenerEventos = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/getEvents`);
      const eventosData = response.data;
  
      setEventos(eventosData);
  
      const updatedMarkedDates = {};
      eventosData.forEach((evento) => {
        const date = moment(evento.event_date).format('YYYY-MM-DD'); 
        updatedMarkedDates[date] = {
          marked: true,
          dotColor: 'blue', 
          evento: evento, 
        };
      });
      setMarkedDates(updatedMarkedDates);
    } catch (error) {
      console.log('Error al obtener eventos:', error);
    }
  };

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

  const signOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error al limpiar el almacenamiento:', error);
    }
    updateUser(null);
  
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  const handleDayPress = async (selected) => {
    const fechaSeleccionada = selected.dateString;
    setSelectedDate(fechaSeleccionada);
    const eventosDelDia = await fetchEventosDelDia(fechaSeleccionada);
    setEventosDelDia(eventosDelDia);
  };
  
  const fetchEventosDelDia = async (fechaSeleccionada) => {
    if (!fechaSeleccionada) {
      return [];
    }
  
    try {
      const response = await axios.get(
        `${API_URL}/user/getDailyEvents/${fechaSeleccionada}`
      );
      return response.data;
    } catch (error) {
      console.log('Error al obtener eventos del día:', error);
      return [];
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.eventosContainer}>
        <Text style={{textAlign: 'center', marginBottom: 5}}>Bienvenido, {user && user.username}</Text>

        <CalendarScreen eventos={eventos} onDayPress={handleDayPress} />

        <EventList eventos={eventosDelDia} />

      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCrearEvento} style={styles.button}>
          <Text style={styles.buttonText} >
            {selectedDate ? `Crear evento para ${selectedDate}` : "Agregar evento"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <CrearEventoForm onClose={closeModal} onSubmit={handleFormSubmit} selectedDate={selectedDate} />
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
  eventosContainer: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 16,
  },
  eventoCard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
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