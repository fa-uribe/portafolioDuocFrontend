import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const darkTheme = {
  backgroundColor: '#343434',
  textColor: 'white',
};

export const lightTheme = {
  backgroundColor: 'white',
  textColor: 'black',
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(lightTheme);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, theme, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
