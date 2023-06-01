import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const EventCard = ({ evento }) => {
    return (
      <View key={evento._id} style={styles.card}>
        <Text style={styles.title}>{evento.event_name}</Text>
        <Text style={styles.description}>{evento.description}</Text>
        <Text style={styles.time}>{evento.start_hour} - {evento.end_hour}</Text>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default EventCard;