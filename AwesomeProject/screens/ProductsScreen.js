import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  RefreshControl,
  Modal,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../assets/config.json';
import styles from '../styles/ProductsStyles.js';
import { colors } from '../styles/variables.js';

const CustomIcon = createIconSetFromFontello(fontelloConfig, 'AwesomeIcons');

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
    modalVisible: false,
  };

  componentDidMount() {
    this.mounted = true;
    this.fetchProducts();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  setModalVisible = (modalVisible) => {
    if (this.mounted) {
      this.setState({modalVisible});
    }
  };

  setRefreshing = (refreshing) => {
    if (this.mounted) {
      this.setState({refreshing})
    }
  };

  setProducts = (items) => {
    if (this.mounted) {
      this.setState(({productsList}) => ({productsList: [...productsList, ...items]}));
    }
  };

  fetchProducts = () => {
    return fetch(`http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=${this.state.page}`)
      .then((response) => {
        if (!response || response.status !== 200) {
          throw  response;
        }
        return response;
      })
      .then(response => response.json())
      .then((response) => {
        this.setProducts(response.items);
        return response;
      })
      .catch((error) => {
        this.setModalVisible(true);
        return error;
      });
  };

  onRefresh = () => {
    this.setRefreshing(true);
    this.fetchProducts().then(() => this.setRefreshing(false));
  };

  handleLoadMore = () => {
    this.setState(
      ({page}) => ({page: page + 1}),
      () => this.fetchProducts()
    );
  };

  renderModal() {
    const {modalVisible} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        style={styles.modal}
        onRequestClose={() => {
          Alert.alert(
            'Close modal?',
            'The list will not be updated.',
            [
              {text: 'OK', onPress: () => this.setModalVisible(false)}
            ]
          );
        }}
      >
        <View style={{marginTop: 22}}>
          <View>
            <Text style={styles.modalMessage}>
              There is some problems with the Internet connection. Please try again.
            </Text>
          </View>
          <View style={styles.modalButtonWrapper}>
            <TouchableHighlight
              style={styles.modalButton}
              onPress={() => {
                this.onRefresh();
              }}
            >
              <Text style={styles.modalButtonText}>Try again</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.modalButton}
              onPress={() => {
                this.setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }

  renderList() {
    const {navigate} = this.props.navigation;
    const {productsList, refreshing} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={productsList}
          refreshing={refreshing}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.onRefresh()}
          renderItem={({item}) => (
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
                <Ionicons name="ios-arrow-forward" size={22} />
              </View>
            </TouchableHighlight>
          )}
          onEndReached={this.handleLoadMore}
          onEndThreshold={0}
        />
      </View>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderList()}
        {this.renderModal()}
      </React.Fragment>
    );
  }
}
