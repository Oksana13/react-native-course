import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';
import MapScreen from '../screens/MapScreen';

const AppStack = createStackNavigator({ 
  Products: ProductsScreen, 
  Product: ProductScreen, 
  Map: MapScreen 
});
const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthenticationScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
