import React from 'react';
import { View, AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class AuthenticationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.checkToken();
  }

  checkToken = async () => {
    const {navigate} = this.props.navigation;
    const userToken = await AsyncStorage.getItem('userToken');
    SplashScreen.hide();

    navigate(userToken ? 'Products' : 'Login');
  };

  render() {
    return (
      <View></View>
    )
  }
}
