import React from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import styles from '../styles/LoginStyles.js';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { 
      userName: '',
      userPassword: '',
      errorMessage: '',
      responseStatus: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Image
            source={require('../assets/images/heart.png')
            }
            style={styles.image}
          />
          <Text style={styles.title}>
            Friday's shop
          </Text>
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
            <Text>
                {this.state.errorMessage}
            </Text>
            <TouchableHighlight
              style={styles.buttonWrapper}
              onPress={this.userLogin}
            >
              <Text
                style={styles.buttonText}
              >
                Login
              </Text>
            </TouchableHighlight >
          </View>
        </ScrollView>
      </View>
    );
  }

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
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
