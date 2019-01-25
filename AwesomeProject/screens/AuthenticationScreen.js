import React from 'react';
import { View, AsyncStorage } from 'react-native';

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

    navigate(userToken ? 'Products' : 'Login');
  };

  render() {
    return (
      <View></View>
    )
  }
}
