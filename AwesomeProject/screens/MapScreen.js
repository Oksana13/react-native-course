import React from 'react';
import {
  Text,
  BackHandler,
  Linking,
} from 'react-native';
import { MapView, Marker } from 'expo';
import { colors } from '../styles/variables.js';

export default class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.blue,
      },
      headerTintColor: colors.white,      
    }
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = async () => {
    await this.props.navigation.goBack();
    return true;
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 59.9431597,
          longitude: 30.3248953,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: 59.9431597,
            longitude: 30.3248953
          }}
          onPress={()=> {
            Linking.openURL(`tel:88123065968`).catch(err => console.error('An error occurred', err));
          }}
        >
          <Text>{"Product provider"}</Text>
        </MapView.Marker>
      </MapView>
    );
  }
}
