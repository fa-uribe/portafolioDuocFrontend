import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet } from 'react-native';

const CalendarComponent = ({ markedDates, onDayPress }) => {
  const [selected, setSelected] = useState(new Date().toISOString().slice(0, 10));

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedDates}
      current={selected}
      onDayPress={(day) => {
        setSelected(day.dateString);
        onDayPress(day);
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