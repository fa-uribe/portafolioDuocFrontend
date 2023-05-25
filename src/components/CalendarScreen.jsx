import React, { useState, useEffect } from "react";
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const CalendarScreen = ({ eventos, onDayPress }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const setEventMarkers = () => {
      const updatedMarkedDates = {};

      eventos.forEach((evento) => {
        const date = evento.event_date;
        updatedMarkedDates[date] = {
          marked: true,
          dotColor: 'blue', 
        };
      });

      setMarkedDates(updatedMarkedDates);
    };

    setEventMarkers();
  }, [eventos]);

  const handleDateSelect = (date) => {
    const selected = date.dateString;
  
    const updatedMarkedDates = { ...markedDates };
  
    if (selectedDate && updatedMarkedDates[selectedDate]) {
      updatedMarkedDates[selectedDate] = {
        ...updatedMarkedDates[selectedDate],
        selected: false,
      };
    }
  
    updatedMarkedDates[selected] = {
      ...updatedMarkedDates[selected],
      selected: true,
    };
  
    setMarkedDates(updatedMarkedDates);
    setSelectedDate(selected);
    onDayPress(date);
  };

  useEffect(() => {
    if (selectedDate) {
      const updatedMarkedDates = {
        ...markedDates,
        [selectedDate]: {
          ...markedDates[selectedDate],
          selected: true,
        },
      };
      setMarkedDates(updatedMarkedDates);
    }
  }, [selectedDate]);
  

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
    selectedDayTextColor: 'black',
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
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...(markedDates[selectedDate] || {}),
            selected: true,
          },
        }}
        onDayPress={handleDateSelect}
        theme={calendarTheme}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 10,
          overflow: 'hidden',
        }}
        current={selectedDate ?? ''}
      />
    </View>
  );
};

export default CalendarScreen;