import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/components/Login.jsx';
import CalendarComponent from './src/components/Calendar.jsx';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Calendar" component={CalendarComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
