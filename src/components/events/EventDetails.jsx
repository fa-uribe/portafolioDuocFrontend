import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios, { API_URL } from '../../data/apiConfig.js';

const EventDetails = ({ evento, onClose, updateCalendar }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedEvento, setEditedEvento] = useState({ ...evento });

  const handleClose = () => {
    onClose();
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${API_URL}/user/editEvent/${evento._id}`, editedEvento);
      Alert.alert('Éxito', 'El evento se editó exitosamente.');
      setEditMode(false);
      onClose();
      updateCalendar();
    } catch (error) {
      Alert.alert('Error', 'No se pudo editar el evento.');
    }
  };
  
  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDelete = async () => {
    Alert.alert(
      'Eliminar evento',
      '¿Estás seguro de que deseas eliminar este evento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              const response = await axios.delete(`${API_URL}/user/deleteEvent/${evento._id}`);
              Alert.alert('Éxito', 'El evento se eliminó exitosamente.');
              onClose();
              updateCalendar();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el evento.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  const handleChangeEventName = (text) => {
    setEditedEvento({ ...editedEvento, event_name: text });
  };

  const handleChangeDescription = (text) => {
    setEditedEvento({ ...editedEvento, description: text });
  };

  const handleChangeStartHour = (text) => {
    setEditedEvento({ ...editedEvento, start_hour: text });
  };

  const handleChangeEndHour = (text) => {
    setEditedEvento({ ...editedEvento, end_hour: text });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Icon name="times" size={24} color="gray" />
      </TouchableOpacity>

      <View style={styles.content}>
        {editMode ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nombre evento"
              value={editedEvento.event_name}
              onChangeText={handleChangeEventName}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={editedEvento.description}
              onChangeText={handleChangeDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Hora de inicio (ejemplo: 10:00)"
              value={editedEvento.start_hour}
              onChangeText={handleChangeStartHour}
            />
            <TextInput
              style={styles.input}
              placeholder="Hora de fin (ejemplo: 12:30)"
              value={editedEvento.end_hour}
              onChangeText={handleChangeEndHour}
            />
          </>
        ) : (
          <>
            <Text style={styles.title}>{evento.event_name}</Text>
            <Text style={styles.date}>Fecha: {evento.event_date}</Text>
            <Text style={styles.time}>
              {evento.start_hour} - {evento.end_hour}
            </Text>
            <Text style={styles.description}>{evento.description}</Text>
          </>
        )}
      </View>

      <View style={styles.footer}>
        {editMode ? (
          <>
            <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
              <Icon name="check" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.iconButton}>
              <Icon name="times" size={21} color="gray" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
              <Icon name="edit" size={21} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
              <Icon name="trash" size={20} color="gray" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 18,
    marginBottom: 8,
  },
  time: {
    fontSize: 18,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    gap: 20,
  },
  iconButton: {
    marginHorizontal: 8,
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    height: 40, // Establecer un tamaño fijo para los campos de entrada
  },
});

export default EventDetails;