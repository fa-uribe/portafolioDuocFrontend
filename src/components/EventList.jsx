import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EventCard from './EventCard';
import UserContext from '../data/userContext.js';

const EventList = ({ eventos, onPressEvent }) => {
  const { theme } = useContext(UserContext);
  const { textColor } = theme;

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
        <Text style={{ marginTop: 8, color: textColor }}>
          No hay eventos para esta fecha.
        </Text>
      )}
    </View>
  );
};

export default EventList;