import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';
import MapScreen from '../screens/MapScreen';

const App = createStackNavigator({
  Login: {screen: LoginScreen},
  Products: {screen: ProductsScreen},
  Product: {screen: ProductScreen},
  Map: {screen: MapScreen},
});

export default App;