import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const EventDetails = ({ evento, onClose, onDelete }) => {
  const handleClose = () => {
    onClose();
  };

  const handleEdit = () => {
    
  };

  const handleDelete = () => {
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
          onPress: () => {
            onDelete(evento._id);
            onClose();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Icon name="times" size={24} color="gray" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{evento.event_name}</Text>
        <Text style={styles.date}>Fecha: {evento.event_date}</Text>
        <Text style={styles.time}>
          {evento.start_hour} - {evento.end_hour}
        </Text>
        <Text style={styles.description}>{evento.description}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <Icon name="edit" size={21} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
          <Icon name="trash" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    gap: 20
  },
  iconButton: {
    marginHorizontal: 8,
  },
});

export default EventDetails;