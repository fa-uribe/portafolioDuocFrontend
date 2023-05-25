import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from '../data/apiConfig.js';


const CrearEventoForm = ({ onClose, onSubmit, selectedDate }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');


  const handleFormSubmit = async () =>{
    try{
      const evento = {
        event_name: nombre,
        description: descripcion,
        event_date: formattedDate,
        start_hour: horaInicio,
        end_hour: horaFin,
      };

      const request = await axios.post('http://localhost:8080/myEstCalendarAPI/user/createEvent', evento);

      onSubmit(evento);
      Alert.alert(
        'Evento creado',
        `Se ha creado el evento "${evento.event_name}" para la fecha ${evento.event_date}.`,
        [{ text: 'OK' }]
      );
      onClose();
    }
    catch(error){
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
    <View style={styles.container}>
      <Text style={styles.title}>Creando evento para {formattedDate}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del evento"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora de inicio (ej. 10:00)"
        value={horaInicio}
        onChangeText={setHoraInicio}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora de fin (ej. 12:30)"
        value={horaFin}
        onChangeText={setHoraFin}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Crear evento</Text>
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
    backgroundColor: 'green',
    borderRadius: 5,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CrearEventoForm;