import { StyleSheet } from 'react-native';
import { colors, width } from './variables.js';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingVertical: 10,
    borderTopColor: colors.lightGrey,
    borderBottomColor: colors.lightGrey,
    borderWidth: 1,
  },
  product: {
    flexDirection: 'row',
  },
  productName: {
    paddingLeft: 20,
    fontSize: 24,
    fontFamily: 'vinchHand',
  },
  icon: {
    paddingTop: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
  },
  modalMessage: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'vinchHand',
  },
  modalButtonWrapper: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 50,
  },
  modalButton: {
    width: 100,
    marginLeft: 0,
  },
  modalButtonText: {
    paddingVertical: 5,
    backgroundColor: colors.green,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'vinchHand',
    color: colors.white,
  },
});
