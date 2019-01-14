import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  RefreshControl,
  Modal,
  Alert,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../assets/config.json';
import styles from '../styles/ProductsStyles.js';
import { colors } from '../styles/variables.js';

const CustomIcon = createIconSetFromFontello(fontelloConfig, 'AwesomeIcons');

export default class ProductsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
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
  });

  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      productsList: [],
      page: 0,
      refreshing: false,
      modalVisible: false,
      disabledButtons: false,
      fadeAnim: new Animated.Value(0),
    };
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.mounted = true;
    this.fetchProducts();
    this.sequenceAnimation();
  }

  fadeAnimation() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  }

  sequenceAnimation() {
    this.animatedValue.setValue(0);
    Animated.sequence([
      Animated.timing(this.animatedValue, {
        toValue: -30,
        duration: 500,
      }),
      Animated.timing(this.animatedValue, {
        toValue: -15,
        duration: 200,
      })
    ]).start(() => this.sequenceAnimation());
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

  setButtonsDisabled = (disabledButtons) => {
    if (this.mounted) {
      this.setState({disabledButtons})
    }
  };

  setProducts = (items) => {
    if (this.mounted) {
      this.setState(({productsList}) => ({productsList: [...productsList, ...items]}));
      this.fadeAnimation();
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
    this.setButtonsDisabled(true);
    this.fetchProducts().then(() => {
      this.setRefreshing(false);
      this.setButtonsDisabled(false);
    });
  };

  handleLoadMore = () => {
    this.setState(
      ({page}) => ({page: page + 1}),
      () => this.fetchProducts()
    );
  };

  navigateToProduct = (item) => {
    const {navigate} = this.props.navigation;
    navigate('Product', {
      productName: item.name,
      description: item.custom_attributes.find(product => product.attribute_code === 'description')
    })
  }

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
              disabled={this.state.disabledButtons}
              onPress={() => {
                this.onRefresh();
              }}
            >
              <Text style={styles.modalButtonText}>Try again</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.modalButton}
              disabled={this.state.disabledButtons}
              onPress={() => {this.setModalVisible(false)}}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }

  renderList() {
    const {productsList, refreshing, fadeAnim} = this.state;
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
    const scroll = new Animated.Value(0);
    const translateY = Animated.diffClamp(
      scroll, 0, 50
    );
    const opacity = translateY.interpolate({
      inputRange: [0, 50], 
      outputRange: [1, 0]
    });

    return (
      <View style={styles.container}>
        <Animated.View style= {{ 
              backgroundColor: 'yellow',
              alignItems: 'center',
              transform: [ { translateY } ]
            }}
          >
          <Animated.Text style ={{ opacity }}>
          List of best products
          </Animated.Text>
        </Animated.View>
        <AnimatedFlatList 
          contentContainerStyle={{ paddingTop: 50 }}
          onScroll={ Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true }
          )}
          data={productsList}
          refreshing={refreshing}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.onRefresh()}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor="#CEDB56"
              onPress={() => this.navigateToProduct(item)}
            >
              <Animated.View style={
                [styles.row, {
                  opacity: fadeAnim,
                }]}
              >
                <View style={styles.product}>
                  <Text style={styles.productName}>
                    {item.name}
                  </Text>
                </View>
                <AnimatedIonicons 
                  name="ios-arrow-forward" 
                  size={22}
                  style={{marginRight: this.animatedValue}} 
                />
              </Animated.View>
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
