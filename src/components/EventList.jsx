import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EventCard from './EventCard';

const EventList = ({ eventos, onPressEvent }) => {
  const handleEventPress = (evento) => {
    onPressEvent(evento);
  };

  return (
    <View>
      {eventos.length > 0 ? (
        eventos.map((evento) => (
          <TouchableOpacity
            key={evento._id}
            onPress={() => handleEventPress(evento)}
          >
            <EventCard evento={evento} />
          </TouchableOpacity>
        ))
      ) : (
        <Text style={{ marginTop: 8 }}>No hay eventos para esta fecha.</Text>
      )}
    </View>
  );
};

export default EventList;