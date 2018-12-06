import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ScrollView,
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
      fontWeight: 'normal',
      fontFamily: 'vinchHand',
      fontSize: 30
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
        icon: 'map-o',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        key: 'Product 2',
        icon: 'smile',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        key: 'Product 3',
        icon: 'star-empty',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        key: 'Product 4',
        icon: 'camera-alt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        key: 'Product 5',
        icon: 'gift',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        key: 'Product 6',
        icon: 'plus',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        key: 'Product 7',
        icon: 'basket',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        key: 'Product 8',
        icon: 'football',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
    ]

    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList 
            data={productsList}
            renderItem={({item}) => 
            <TouchableHighlight
              underlayColor="#CEDB56"
              onPress={() => {navigate('Product', {
                productName: item.key,
                productIcon: item.icon,
                description: item.description,
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
        </ScrollView>
      </View>
    );
  }
}
