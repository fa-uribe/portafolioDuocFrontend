import React, { useState, useRef } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { LocaleConfig } from 'react-native-calendars';
import { Calendar, Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import moment from "moment/moment";
import AgendaScreen from "./AgendaScreen.jsx";

const Main = () => {

  LocaleConfig.locales['es'] = {
    formatAccessibilityLabel: "dddd d 'de' MMMM 'del' yyyy",
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Augosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    dayNamesShort: ['D', 'L', 'M', 'Mi', 'J', 'V', 'S'],
    // numbers: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] // number localization example
  };
  LocaleConfig.defaultLocale = 'es';


  return (
    <AgendaScreen />
  );
};

export default Main;