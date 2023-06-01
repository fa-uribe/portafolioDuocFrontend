import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';
import { UserProvider } from './src/data/userContext.js';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './src/components/LoginContainer.jsx';
import MainComponent from './src/components/Main.jsx';
import RegisterScreen from './src/components/Register.jsx';


const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainComponent} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

AppRegistry.registerComponent('main', () => App);

export default App;