import React from 'react';
import UserContext from '../data/userContext.js';
import Login from './Login.jsx';

const LoginContainer = ({ navigation }) => {
  return (
    <UserContext.Consumer>
      {(userContext) => (
        <Login updateUser={userContext.updateUser} navigation={navigation} />
      )}
    </UserContext.Consumer>
  );
};

export default LoginContainer;