import React, { useState, useEffect } from "react";
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const CalendarScreen = ({ eventos, onDayPress }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const updatedMarkedDates = {};

    eventos.forEach((evento) => {
      const date = evento.start_date; // Asegúrate de tener la propiedad correcta para la fecha del evento
      updatedMarkedDates[date] = {
        marked: true,
        dotColor: 'blue', // Personaliza el color del punto según tus necesidades
      };
    });

    setMarkedDates(updatedMarkedDates);
  }, [eventos]);

  const handleDateSelect = (date) => {
    const selected = date.dateString;
    setSelectedDate(selected);
    onDayPress(date);
  };

  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'Ene.',
      'Feb.',
      'Mar.',
      'Abr.',
      'May.',
      'Jun.',
      'Jul.',
      'Ago.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dic.',
    ],
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  };

  LocaleConfig.defaultLocale = 'es';

  const calendarTheme = {
    backgroundColor: 'lightgray',
    calendarBackground: 'white',
    selectedDayBackgroundColor: 'orange',
    selectedDayTextColor: 'white',
    dotColor: 'red',
    selectedDotColor: 'orange',
    arrowColor: 'black',
    monthTextColor: 'black',
    dayTextColor: 'black',
    textDisabledColor: 'gray',
    todayTextColor: 'blue',
    textDayFontWeight: '500',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: 'bold',
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 14,
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDateSelect}
        theme={calendarTheme}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      />
    </View>
  );
};

export default CalendarScreen;
