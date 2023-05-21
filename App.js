import React from 'react';
import { UserProvider } from './src/data/userContext.js';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/components/LoginContainer.jsx';
import MainComponent from './src/components/Main.jsx';
import RegisterScreen from './src/components/Register.jsx';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider> {/* Asegúrate de envolver toda la aplicación con el UserProvider */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainComponent} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
