import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert, Button } from "react-native";
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext, { darkTheme, lightTheme } from '../data/userContext.js';
import { CommonActions } from '@react-navigation/native';

const SettingsScreen = () => {
  const { user, updateUser, theme, toggleTheme } = useContext(UserContext);
  const { backgroundColor, textColor } = theme;

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleToggleSwitch = () => {
    toggleTheme();
  };

  const signOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error al limpiar el almacenamiento:', error);
    }
    updateUser(null);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          onPress: () => {
            signOut();
          },
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity onPress={handleGoBack} style={[styles.backButton, { color: textColor }]}>
        <Icon name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: textColor }]}>Configuración</Text>

      <View style={styles.sectionContainer}>
        {user && (
          <View style={styles.userInfoContainer}>
            <View style={styles.avatarContainer}>
              <Avatar
                rounded
                size="large"
                icon={{ name: 'user', type: 'font-awesome' }}
                containerStyle={styles.avatar}
              />
            </View>
            <View style={styles.userInfoTextContainer}>
              <Text style={styles.userInfoText}>Usuario: {user.username}</Text>
              <Text style={styles.userInfoText}>Email: {user.email}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.optionContainer}>
          <Text style={[styles.optionText, { color: textColor }]}>Tema oscuro</Text>
          <Switch value={theme === darkTheme} onValueChange={handleToggleSwitch} />
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Button style={styles.buttonContainer} title="Cerrar sesión" onPress={handleSignOut} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title:{
    fontSize:24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  backButton: {
    marginTop: 16,
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 18,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#48C3E7',
    borderRadius: 20,
    padding: 10,
  },
  buttonContainer: {
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 10,
    zIndex: 1,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    backgroundColor: 'gray',
  },
  userInfoTextContainer: {
    flex: 1,
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
});

export default SettingsScreen;
