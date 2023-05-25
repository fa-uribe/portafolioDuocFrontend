import React from 'react';
import { View, Text } from 'react-native';
import EventCard from './EventCard';

const EventList = ({ eventos }) => {
  return (
    <View>
      {eventos.length > 0 ? (
        eventos.map((evento) => (
          <EventCard key={evento._id} evento={evento} />
        ))
      ) : (
        <Text style={{ marginTop: 8 }}>No hay eventos para esta fecha.</Text>
      )}
    </View>
  );
};

export default EventList;