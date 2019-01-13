import { StyleSheet } from 'react-native';
import { colors, width } from './variables.js';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 100,
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  titleContainer: {
    height: 40,
    marginVertical: 70,
  },
  title: {
    marginVertical: 70,
    fontSize: 40,
    fontFamily: 'vinchHand',
    color: colors.graphite,
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  email: {
    width: 300,
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 24,
    fontFamily: 'vinchHand',
  },
  input: {
    paddingVertical: 5,
    width: 300,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'vinchHand',
  },
  buttonWrapper: {
    width: 100,
    marginTop: 10,
  },
  button: {
    width: 150,
    justifyContent: 'center',
    marginLeft: 50,
  },
  buttonText: {
    paddingVertical: 5,
    backgroundColor: '#76cdd8',
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'vinchHand',
  },
  inputWrapper: {
    marginBottom: 20,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: width.borderWidth,
    borderTopColor: colors.lightGrey,
    borderTopWidth: width.borderWidth,
    borderLeftColor: colors.lightGrey,
    borderLeftWidth: width.borderWidth,
    borderRightColor: colors.lightGrey,
    borderRightWidth: width.borderWidth,
  },
});
