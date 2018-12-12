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
    productsList: [],
    page: 0,
    refreshing: false,
  };

  componentDidMount() {
    this.fetchProducts();
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      }, () => {
        this.fetchProducts();
      }
    );
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.productsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => 
          <TouchableHighlight
            underlayColor="#CEDB56"
            onPress={() => {navigate('Product', {
              productName: item.name,
              description: item.custom_attributes.find(product => product.attribute_code === 'description')
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
                <Text style={styles.productName}>{item.name}</Text>
              </View>
              
              <Ionicons 
                name="ios-arrow-forward"
                size={22}
              />
            </View>
          </TouchableHighlight>
          }
          onEndReached={this.handleLoadMore}
          onEndThreshold={0}
        />
      </View>
    );
  }

  fetchProducts = () => {
    fetch(`http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=${this.state.page}`)
      .then(response => response.json())
      .then(response => {
        this.setState({productsList: [...this.state.productsList, ...response.items]});
      });
  }
}
