import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import moment from "moment/moment";
import CalendarScreen from "./CalendarScreen";
import CrearEventoForm from "./CrearEvento";

const Main = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventData, setEventData] = useState(null);

  const handleCrearEvento = () => {
    setModalVisible(true);
  };

  const handleFormSubmit = (evento) => {
    // Lógica para guardar los datos del evento o enviarlos a través de una API
    console.log(evento);
    setEventData(evento);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
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
