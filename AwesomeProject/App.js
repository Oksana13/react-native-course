import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Sentry from 'sentry-expo';
Sentry.config('https://b47b7575bfa64cccbe850343f5c8380c@sentry.io/1426364').install();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'AwesomeIcons': require('./assets/fonts/awesome-icons.ttf')
    });

    this.setState({fontLoaded: true});
  }

  render() {
    if (!this.state.fontLoaded) { return null;}
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'vinchHand': require('./assets/fonts/VINCHAND.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
    Sentry.captureMessage(`Something went wrong: ${error}`);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
