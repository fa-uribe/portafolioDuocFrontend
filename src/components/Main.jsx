import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, BackHandler, Alert, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import moment from "moment/moment";
import axios, { API_URL } from "../data/apiConfig.js";

import UserContext from "../data/userContext.js";
import CalendarScreen from "./CalendarScreen.jsx";
import CrearEventoForm from "./CreateEvent.jsx";
import EventList from './EventList.jsx';
import EventDetails from './EventDetails.jsx';

const Main = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [eventosDelDia, setEventosDelDia] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [markedDates, setMarkedDates] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

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
      setIsLoadingEvents(true);
      const todayEvents = await fetchEventosDelDia(selectedDate)
      setEventosDelDia(todayEvents);
      setIsLoadingEvents(false);

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
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      console.log('Error al obtener eventos:', error);
    }
  };

  const handleCrearEvento = () => {
    const today = moment().format('YYYY-MM-DD');
  
    if (selectedDate < today) {
      Alert.alert(
        'Fecha inválida',
        'No puedes crear un evento para una fecha anterior a hoy.',
        [{ text: 'OK' }]
      );
      return;
    }
  
    setModalVisible(true);
  };

  const handleFormSubmit = (evento) => {
    setEventData(evento);
    obtenerEventos();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      
      await axios.delete(`${API_URL}/user/deleteEvent/${eventId}`);
      
      obtenerEventos();
    } catch (error) {
      console.log('Error al eliminar el evento:', error);
      Alert.alert('Error', 'Ha ocurrido un error al eliminar el evento. Por favor, inténtalo nuevamente.', [{ text: 'OK' }]);
    }
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
    setIsLoadingEvents(true); 
    const eventosDelDia = await fetchEventosDelDia(fechaSeleccionada);
    setEventosDelDia(eventosDelDia);
    setIsLoadingEvents(false);
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

  const handleEventCardPress = (evento) => {
    setSelectedEvent(evento);
    setEventDetailsVisible(true);
  };

  const handleEventDetailsClose = () => {
    setEventDetailsVisible(false);
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.eventosContainer}>
        <Text style={styles.bienvenida}>¡Bienvenido, {user && user.username}!</Text>

        <CalendarScreen eventos={eventos} onDayPress={handleDayPress} />

        {isLoadingEvents ? (
          <ActivityIndicator style={{marginTop: 15}} size="large" color="#0000ff" />
        ) : (
          <EventList eventos={eventosDelDia} onPressEvent={handleEventCardPress} />
        )}

      </ScrollView>

      {selectedDate && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCrearEvento} style={styles.button}>
            <Text style={styles.buttonText}>
              {selectedDate ? `Crear evento para ${selectedDate}` : "Agregar evento"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={isModalVisible} animationType="slide">
        <CrearEventoForm onClose={closeModal} onSubmit={handleFormSubmit} selectedDate={selectedDate} />
      </Modal>

      {selectedEvent && (
        <Modal
          visible={isEventDetailsVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleEventDetailsClose}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBackground}
              activeOpacity={1}
              onPress={handleEventDetailsClose}
            >
              <EventDetails evento={selectedEvent} onClose={handleEventDetailsClose} onDelete={handleDeleteEvent} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bienvenida: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40
  },
  eventosContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    //position: 'sticky',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 10,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    width: 300,
    height: 400, 
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default Main;