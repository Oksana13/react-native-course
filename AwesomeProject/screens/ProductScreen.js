import React from 'react';
import {
  Text,
  View,
  TouchableHighlight 
} from 'react-native';
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../assets/config.json';
const CustomIcon = createIconSetFromFontello(fontelloConfig, 'AwesomeIcons');
import styles from '../styles/ProductStyles.js';
import { colors } from '../styles/variables.js';

export default class ProductScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.blue,
      headerTintColor: colors.white,
    },
  };

  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const productName = navigation.getParam('productName');
    const productIcon = navigation.getParam('productIcon');

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <CustomIcon 
            style={styles.icon} 
            name={productIcon} 
            size={28} 
            color="#222" 
          />
          <Text style={styles.productName}>
            {productName}
          </Text>
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {navigate('Products')}}
        >
          <Text
            style={styles.buttonText}
          >
            All products
          </Text>
        </TouchableHighlight >
      </View>
    );
  }
}
