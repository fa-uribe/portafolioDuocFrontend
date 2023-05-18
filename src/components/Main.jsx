import React from "react"
import { Text, View, StyleSheet } from 'react-native'
import { useState } from "react"
import SubjectList from './SubjectList.jsx'
import UserList from "./UserList.jsx"
import Calendar from './Calendar.jsx'
import Agenda from './Agenda.jsx'
import generateItems from '../data/testItems.js'

const Main = () => {
    const [items, setItems] = useState({});

    const onDayPress = (day) => {
      const newItems = { ...items };
      newItems[day.dateString] = [
        {
          name: 'Item 1',
          time: '10:00',
          description: 'Description for Item 1',
        },
        {
          name: 'Item 2',
          time: '12:00',
          description: 'Description for Item 2',
        },
        {
          name: 'Item 3',
          time: '14:00',
          description: 'Description for Item 3',
        },
      ];
      setItems(newItems);
    };
  
    return (
      <View style={styles.container}>
        <Calendar onDayPress={onDayPress} />
        <Agenda items={items} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

export default Main;