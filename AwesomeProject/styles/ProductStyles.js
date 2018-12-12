import { StyleSheet } from 'react-native';
import { colors, width } from './variables.js';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.white,
  },
  icon: {
    color: colors.white,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  description: {
    fontSize: 18,
    fontFamily: 'vinchHand',
    marginVertical: 40,
    marginLeft: 50,
    marginRight: 100,
  },
  productName: {
    paddingLeft: 20,
    fontSize: 30,
    fontFamily: 'vinchHand',
    color: colors.white,
  },
  button: {
    width: 150,
    justifyContent: 'center',
    marginLeft: 50,
  },
  buttonText: {
    paddingVertical: 5,
    backgroundColor: colors.green,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'vinchHand',
    color: colors.white,
  },
  webView: {
    minHeight: 320,
    minWidth : 200,
    flex: 1
  },
});