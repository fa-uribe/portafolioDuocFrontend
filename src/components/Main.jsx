import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, BackHandler, Alert, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import moment from "moment/moment";
import axios from "../data/apiConfig.js";

import UserContext from "../data/userContext.js";
import CalendarScreen from "./CalendarScreen.jsx";
import CrearEventoForm from "./CreateEvent.jsx";
import EventCard from "./EventCard.jsx";

const Main = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [eventosDelDia, setEventosDelDia] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    obtenerEventos();
  }, []);

  const obtenerEventos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/myEstCalendarAPI/user/getEvents');
      const eventosData = response.data;
  
      setEventos(eventosData);
  
      // Actualiza los marcadores en el calendario
      const updatedMarkedDates = {};
      eventosData.forEach((evento) => {
        const date = moment(evento.start_date).format('YYYY-MM-DD'); 
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

  const handleDayPress = (selected) => {
    const fechaSeleccionada = selected.dateString;
    setSelectedDate(fechaSeleccionada);
    obtenerEventosDelDia(fechaSeleccionada);
  };
  
  const obtenerEventosDelDia = async (fechaSeleccionada) => {
    if (!fechaSeleccionada) {
      setEventosDelDia([]);
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:8080/myEstCalendarAPI/user/getDailyEvents/${fechaSeleccionada}`);
      const eventosDelDia = response.data;
      console.log(eventosDelDia);
      console.log(fechaSeleccionada);
      setEventosDelDia(eventosDelDia);
    } catch (error) {
      console.log('Error al obtener eventos del día:', error);
      setEventosDelDia([]);
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.eventosContainer}>
        <Text>Bienvenido, {user && user.username}</Text>

        <CalendarScreen eventos={eventos} onDayPress={handleDayPress} />
        {eventosDelDia.length > 0 ? (
          eventosDelDia.map((evento) => (
            <EventCard key={evento._id} evento={evento} />
          ))
        ) : (
          <Text>No hay eventos para esta fecha.</Text>
        )}
      </ScrollView>

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