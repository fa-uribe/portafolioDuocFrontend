import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CrearEventoForm = ({ onClose, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState('');

  const showDatepicker = (dateType) => {
    setShowDatePicker(true);
    setSelectedDateType(dateType);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      if (selectedDateType === 'inicio') {
        setFechaInicio(selectedDate);
      } else {
        setFechaFin(selectedDate);
      }
    }
  };

  const handleFormSubmit = () => {
    const evento = {
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
    };

    onSubmit(evento);

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <View style={styles.container}>
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
      <View>
        <TouchableOpacity style={styles.button} onPress={() => showDatepicker('inicio')}>
          <Text style={styles.buttonText}>Seleccionar fecha de inicio</Text>
        </TouchableOpacity>
        {fechaInicio && (
          <TextInput
            style={styles.input}
            placeholder="Fecha de inicio"
            value={fechaInicio.toISOString()}
            editable={false}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={() => showDatepicker('fin')}>
          <Text style={styles.buttonText}>Seleccionar fecha de fin</Text>
        </TouchableOpacity>
        {fechaFin && (
          <TextInput
            style={styles.input}
            placeholder="Fecha fin"
            value={fechaFin.toISOString()}
            editable={false}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Crear evento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
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