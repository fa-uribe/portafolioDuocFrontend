import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CrearEventoForm = ({ onClose, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState('');

  const showDatePicker = (dateType) => {
    setDatePickerVisible(true);
    setSelectedDateType(dateType);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    if (selectedDateType === 'inicio') {
      setFechaInicio(date);
    } else {
      setFechaFin(date);
    }
    hideDatePicker();
  };

  const handleFormSubmit = () => {
    // Lógica para enviar el formulario y crear el evento
    const evento = {
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
    };

    // Llamar a la función onSubmit para pasar los datos del evento al componente padre
    onSubmit(evento);

    // Cerrar el modal o navegar a la página anterior
    onClose();
  };

  const handleCancel = () => {
    onClose(); // Cerrar el modal
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
        <TouchableOpacity style={styles.button} onPress={() => showDatePicker('inicio')}>
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
        <TouchableOpacity style={styles.button} onPress={() => showDatePicker('fin')}>
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
