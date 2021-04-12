import PropTypes from 'prop-types';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={AppStack}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStack}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

RootStackScreen.propTypes = {
  userToken: PropTypes.any,
};

export default RootStackScreen;
