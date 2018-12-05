import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../assets/config.json';
const CustomIcon = createIconSetFromFontello(fontelloConfig, 'AwesomeIcons');
import styles from '../styles/ProductsStyles.js';
import { colors } from '../styles/variables.js';

export default class ProductsScreen extends React.Component {
  static navigationOptions = {
    title: 'Products',
    headerStyle: {
      backgroundColor: colors.blue,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
      fontFamily: 'vinchHand',
    },
  };

  state = {
    fontLoaded: false,
  };

  render() {
    const {navigate} = this.props.navigation;
    const productsList = [
      {
        key: 'Product 1',
        icon: 'map-o'
      },
      {
        key: 'Product 2',
        icon: 'smile'
      },
      {
        key: 'Product 3',
        icon: 'star-empty'
      },
      {
        key: 'Product 4',
        icon: 'camera-alt'
      },
      {
        key: 'Product 5',
        icon: 'gift'
      },
      {
        key: 'Product 6',
        icon: 'plus'
      },
      {
        key: 'Product 7',
        icon: 'basket'
      },
      {
        key: 'Product 8',
        icon: 'football'
      },
    ]

    return (
      <View style={styles.container}>
        <FlatList 
          data={productsList}
          renderItem={({item}) => 
          <TouchableHighlight
            underlayColor="#CEDB56"
            onPress={() => {navigate('Product', {
              productName: item.key,
              productIcon: item.icon
            })
          }}
          >
            <View style={styles.row}>
              <View style={styles.product}>
                <CustomIcon 
                  style={styles.icon} 
                  name={item.icon} 
                  size={28} 
                  color="#222" 
                />
                <Text style={styles.productName}>{item.key}</Text>
              </View>
              
              <Ionicons 
                name="ios-arrow-forward"
                size={22}
              />
            </View>
          </TouchableHighlight>
          }
        />
      </View>
    );
  }
}
