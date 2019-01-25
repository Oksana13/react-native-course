import React from 'react';
import {
  NativeModules,
  Image,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ScrollView,
  LayoutAnimation,
  TouchableOpacity,
  Animated,
  Easing,
  AsyncStorage,
  NetInfo,
  Alert
} from 'react-native';
import styles from '../styles/LoginStyles.js';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { 
      userName: 'oksana_klimova@epam.com',
      userPassword: 'ReactNative123',
      errorMessage: '',
      responseStatus: '',
      width: 100,
      height: 100,
      connectionStatus : ''
    };
    this.animatedValue = new Animated.Value(0);
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
    this.springValue = new Animated.Value(0.3)
    this.scale = new Animated.Value(-200);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleConnectivityChange
    );
    
    NetInfo.isConnected.fetch().done((isConnected) => {
      if(isConnected == true) {
        this.setState({connectionStatus : "Online"});
      } else {
        this.setState({connectionStatus : "Offline"});
        this.handleConnectionAlert();
      }
    });
    this.parallelAnimation();
    this.animate();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = (isConnected) => {
    if(isConnected == true) {
      this.setState({connectionStatus : "Online"});
    } else {
      this.setState({connectionStatus : "Offline"});
      this.handleConnectionAlert();
    }
  };

  handleConnectionAlert = () => {
    Alert.alert(
      'Wi-Fi and cellular data are turned off',
      'Please, turn network connection on.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }
  
  decayAnimation() {
    this.scale.setValue(-200);
    Animated.decay(
      this.scale, 
      { 
        velocity: 1, 
        deceleration: 0.997,
      }).start();
  }

  spring () {
    this.springValue.setValue(0.3)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1
      }
    ).start()
  }

  parallelAnimation() {
    this.animatedValue1.setValue(0)
    this.animatedValue2.setValue(0)
    const createAnimation = function (value, duration, easing, delay = 0) {
      return Animated.timing(
        value,
        {
          toValue: 1,
          duration,
          easing,
          delay
        }
      )
    }
    Animated.parallel([
      createAnimation(this.animatedValue1, 2000, Easing.ease),
      createAnimation(this.animatedValue2, 1000, Easing.ease, 1000),
    ]).start();
  }

   async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });
    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    });
    const scaleText = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1]
    });
    const introButton = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [-1000, 0]
    });

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TouchableOpacity
            onPress={this.makeAnimation}
          >
            <Animated.Image
              source={require('../assets/images/heart.png')}
              style={[styles.image, {
                width: this.state.width, 
                height: this.state.height,
                opacity,
              }]}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}
            >
            <Animated.Text style={{
                fontSize: textSize,
                fontFamily: 'vinchHand',
              }}
            >
              Friday's shop
            </Animated.Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder={'email'}
                textContentType={'emailAddress'}
                style={styles.email}
                onChangeText={(userName) => this.setState({userName})}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder={'Password'}
                textContentType={'password'}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(userPassword) => this.setState({userPassword})}
              />
            </View>
            <Animated.Text style={{
              marginLeft: this.scale,
              transform: [{scale: this.springValue}]
            }}>
                {this.state.errorMessage}
            </Animated.Text>
            <Animated.View style={{top: introButton}}>
              <TouchableHighlight
                style={styles.buttonWrapper}
                onPress={this.userLogin}
              >
                <Text
                  style={styles.buttonText}
                >
                  Login
                </Text>
              </TouchableHighlight>
            </Animated.View>
          </View>
          <Animated.Text style={{
              marginBottom: 25,
              transform: [{scale: scaleText}]
            }}
          >
            Our brand new app!
          </Animated.Text>
        </ScrollView>
      </View>
    );
  }

  makeAnimation = () => {
    LayoutAnimation.spring();
    this.setState({width: this.state.width + 15, height: this.state.height + 15})
  };

  userLogin = async () => {
    const {navigate} = this.props.navigation;
    await this.login();
    if (this.state.responseStatus === 200) {
      this.setState({errorMessage: ''});
      navigate('Products');
    } else {
      this.setState({errorMessage: 'Login or Password is incorrect'});
    }
  };

  login = () => {
    return fetch('http://ecsc00a02fb3.epam.com/index.php/rest/V1/integration/customer/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": this.state.userName, 
	      "password": this.state.userPassword
      }),
    })
      .then((response) => {
        response.json();
        this.setState({responseStatus: response.status});
        this.saveItem('userToken', response.body);
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        this.decayAnimation();
        this.spring();
      });
  }
}
