import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  BackHandler,
} from 'react-native';
import styles from '../styles/ProductStyles.js';
import { colors } from '../styles/variables.js';
import ProductHeader from '../components/ProductHeader';

export default class ProductScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.blue,
      },
      headerTintColor: colors.white,
      headerTitle: <ProductHeader 
        name={navigation.getParam('productName')}
        icon={navigation.getParam('productIcon')}  
      />,
      
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
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const productName = navigation.getParam('productName');
    const productIcon = navigation.getParam('productIcon');
    const description = navigation.getParam('description');

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.description}>
            {description}
          </Text>
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
        </ScrollView>
      </View>
    );
  }
}
