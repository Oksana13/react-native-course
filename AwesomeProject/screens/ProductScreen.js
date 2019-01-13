import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  BackHandler,
  WebView,
  Animated,
} from 'react-native';
import styles from '../styles/ProductStyles.js';
import { colors } from '../styles/variables.js';
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../assets/config.json';

const CustomIcon = createIconSetFromFontello(fontelloConfig, 'AwesomeIcons');

export default class ProductScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.blue,
      },
      headerTintColor: colors.white,      
    }
  };

  constructor() {
    super();
    this.springValue = new Animated.Value(0.3);
    this.opacityAnimationValue = new Animated.Value(.0);
    this.moveAnimationValue = new Animated.ValueXY();
  }

  componentDidMount() {
    this.springAnimation();
    this.stagerAnimation();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  springAnimation() {
    this.springValue.setValue(0.3)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1
      }
    ).start()
  }

  stagerAnimation() {
    this.opacityAnimationValue.setValue(0);
    Animated.stagger(100, [
      Animated.timing(this.moveAnimationValue, {
        toValue: -50,
        duration: 500
      }),
      Animated.timing(this.opacityAnimationValue, {
        toValue: 1,
        duration: 200
      })
    ]).start()
  }

  handleBackPress = async () => {
    await this.props.navigation.goBack();
    return true;
  }

  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const productName = navigation.getParam('productName');
    const description = navigation.getParam('description') ? navigation.getParam('description') : {value: 'Sorry, there is no description yet'};

    return (
      <View style={styles.container}>
        <View style={styles.title}>
        <TouchableHighlight 
          style={styles.title}
          onPress={() => {navigate('Map', {

          })}}
        >
          <CustomIcon 
            style={styles.icon} 
            name='map-o' 
            size={34} 
          />
          </TouchableHighlight>
          <Animated.Text style={{
            paddingLeft: 20,
            fontSize: 30,
            fontFamily: 'vinchHand',
            transform: [{scale: this.springValue}]
          }}>
            {productName}
          </Animated.Text>
        </View>
        <ScrollView>
          <WebView
            style={styles.webView}
            originWhitelist={['*']}
            source={{ html: description.value }}
          />
           <Animated.View style={{
            opacity: this.opacityAnimationValue, 
            transform: this.moveAnimationValue.getTranslateTransform()
            }}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text
                  style={styles.buttonText}
                >
                  All products
                </Text>
              </TouchableHighlight >
            </Animated.View>
        </ScrollView>
      </View>
    );
  }
}
