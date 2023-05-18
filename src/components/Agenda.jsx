import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Agenda } from 'react-native-calendars';

class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    // Simulamos una petición a una API para obtener los eventos
    setTimeout(() => {
      const events = {
        '2022-05-12': [
          {
            title: 'Evento 1',
            description: 'Descripción del evento 1',
          },
          {
            title: 'Evento 2',
            description: 'Descripción del evento 2',
          },
        ],
        '2022-05-22': [
          {
            title: 'Evento 3',
            description: 'Descripción del evento 3',
          },
        ],
      };

      const items = {};

      Object.keys(events).forEach((date) => {
        items[date] = events[date];
      });

      this.setState({
        items: items,
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={(month) => {
          console.log('Month: ', month);
        }}
        renderItem={(item) => {
          return (
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 20 }}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          );
        }}
      />
    );
  }
}

export default AgendaScreen;