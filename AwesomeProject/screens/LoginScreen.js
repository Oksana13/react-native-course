import React from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';

import styles from '../styles/LoginStyles.js';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
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
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={'Text box'}
              style={styles.input}
              multiline={false}
            />
          </View>
          <TouchableHighlight
            style={styles.buttonWrapper}
            onPress={() => navigate('Products')}
          >
            <Text
              style={styles.buttonText}
            >
              Login
            </Text>
          </TouchableHighlight >
        </View>
      </View>
    );
  }
}
