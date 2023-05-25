import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const EventCard = ({ evento }) => {
    return (
      <View key={evento._id} style={styles.card}>
        <Text>{evento.event_name}</Text>
        <Text>{evento.description}</Text>
        <Text>{evento.start_hour} - {evento.end_hour}</Text>
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
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

export default EventCard;