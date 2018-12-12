import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';

const App = createStackNavigator({
  Products: {screen: ProductsScreen},
  Login: {screen: LoginScreen},
  Product: {screen: ProductScreen},
});

export default App;