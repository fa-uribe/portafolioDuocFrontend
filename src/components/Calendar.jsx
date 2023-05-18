import React, { useState } from 'react';
import { Calendar, Agenda } from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import AgendaComponent from './Agenda.jsx'

const CalendarComponent = ({ markedDates, onDayPress }) => {
  const [selected, setSelected] = useState(new Date().toISOString().slice(0, 10));

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedDates}
      current={selected}
      onDayPress={(day) => {
        setSelected(day.dateString);
        onDayPress(AgendaComponent);
      }}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
});

export default CalendarComponent;