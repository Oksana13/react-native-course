import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../assets/config.json';

const CustomIcon = createIconSetFromFontello(fontelloConfig, 'AwesomeIcons');

export default class ProductHeader extends React.Component {
  render() {
    return (
      <View style={styles.title}>
        <CustomIcon 
          style={styles.icon} 
          name={this.props.icon} 
          size={28} 
        />
        <Text style={styles.productName}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}