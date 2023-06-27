import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios, { API_URL } from '../../data/apiConfig.js';
import UserContext from '../../data/userContext.js';

const CrearEventoForm = ({ onClose, onSubmit, selectedDate }) => {
  const { theme } = useContext(UserContext);
  const { textColor, backgroundColor } = theme;
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  const handleFormSubmit = async () => {
    // Validar el formato de la hora de inicio
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(horaInicio)) {
      Alert.alert(
        'Formato incorrecto',
        'Por favor, ingresa la hora de inicio en el formato HH:MM (ejemplo: 10:00).',
        [{ text: 'OK' }]
      );
      return;
    }

    // Validar el formato de la hora de fin
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(horaFin)) {
      Alert.alert(
        'Formato incorrecto',
        'Por favor, ingresa la hora de fin en el formato HH:MM (ejemplo: 12:30).',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const evento = {
        event_name: nombre,
        description: descripcion,
        event_date: formattedDate,
        start_hour: horaInicio,
        end_hour: horaFin,
      };

      const request = await axios.post(`${API_URL}/user/createEvent`, evento);

      onSubmit(evento);
      Alert.alert(
        'Evento creado',
        `Se ha creado el evento "${evento.event_name}" para la fecha ${evento.event_date}.`,
        [{ text: 'OK' }]
      );
      onClose();
    } catch (error) {
      console.log('Error al crear el evento:', error);
      Alert.alert(
        'Error',
        'Ha ocurrido un error al crear el evento. Por favor, inténtalo nuevamente.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const formattedDate = selectedDate ?? '';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Creando evento para: {selectedDate}
      </Text>
      <TextInput
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholder="Nombre evento"
        placeholderTextColor={textColor}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholder="Descripción"
        placeholderTextColor={textColor} 
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholder="Hora de inicio (ejemplo: 10:00)"
        placeholderTextColor={textColor} 
        value={horaInicio}
        onChangeText={setHoraInicio}
      />
      <TextInput
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholder="Hora de fin (ejemplo: 12:30)"
        placeholderTextColor={textColor}
        value={horaFin}
        onChangeText={setHoraFin}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Crear Evento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F44336',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CrearEventoForm;