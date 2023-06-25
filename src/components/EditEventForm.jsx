import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios, { API_URL } from '../data/apiConfig';
import UserContext from '../data/userContext';

const EditEventForm = ({ evento, onSave, onCancel }) => {
    const { theme } = useContext(UserContext);
    const { textColor, backgroundColor } = theme;
    const [nombre, setNombre] = useState(evento.event_name);
    const [descripcion, setDescripcion] = useState(evento.description);
    const [horaInicio, setHoraInicio] = useState(evento.start_hour);
    const [horaFin, setHoraFin] = useState(evento.end_hour);

  const handleSave = () => {
    const eventoEditado = {
      ...evento,
      event_name: nombre,
      description: descripcion,
      start_hour: horaInicio,
      end_hour: horaFin
    };

    onSave(eventoEditado);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Text style={[styles.title, { color: textColor }]}>Editar Evento</Text>
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
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
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
  saveButton: {
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

export default EditEventForm;
