import React, { useState } from "react";
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const CalendarScreen = () => {
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
        calendarBackground: 'lightgray',
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({
    '2023-05-19': { marked: true, markers: [{ color: 'red' }, { color: 'blue' }] },
    '2023-05-20': { marked: true, dotColor: 'blue' },
    '2023-05-25': { marked: true, dotColor: 'green' },
  });

  const handleDateSelect = (date) => {
    const selected = date.dateString;

    // Conservar los "dots" existentes
    const updatedMarkedDates = { ...markedDates };
    Object.keys(updatedMarkedDates).forEach((date) => {
      updatedMarkedDates[date].selected = false;
    });

    // Verificar si la fecha seleccionada ya existe
    if (!updatedMarkedDates[selected]) {
      // Agregar la fecha con configuración inicial
      updatedMarkedDates[selected] = { selected: true };
    }

    // Actualizar la propiedad "selected" de la fecha seleccionada
    updatedMarkedDates[selected].selected = true;

    setSelectedDate(selected);
    setMarkedDates(updatedMarkedDates);
  };
  const renderMarker = ({ markers }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {markers.map((marker, index) => (
          <View
            key={index}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: marker.color,
              marginRight: 2,
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDateSelect}
        theme={calendarTheme}
        renderMarker={renderMarker}
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
