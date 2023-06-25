import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import UserContext, { darkTheme, lightTheme } from '../data/userContext.js';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(UserContext);
  const { backgroundColor, textColor } = theme;

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>
      <Text style={[styles.sectionTitle, { color: textColor }]}>Configuración</Text>
      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>Tema oscuro</Text>
        <Switch value={theme === darkTheme} onValueChange={toggleTheme} />
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
  backButton: {
    marginTop: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SettingsScreen;