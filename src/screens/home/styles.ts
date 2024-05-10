import {StyleSheet} from 'react-native';
import Flex from '../../../examples/ex06-style-flex';

let paddingDefault = 5;
let fontSizeBig = 36;
let fontSizeMedium = 24;
let fontSizeSmall = 18;

export const styles = StyleSheet.create({
  // Layout styles
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: 'blue',
    fontSize: fontSizeBig,
    color: 'white',
  },
  image: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  content: {
    backgroundColor: 'red',
    flex: 5,
  },
  radioButton: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  adBanner: {
    backgroundColor: 'black',
    height: 100,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: paddingDefault,
    flexDirection: 'row',
    backgroundColor: 'green',
    justifyContent: 'space-between',
  },

  //Component styles
  mainButton: {
    backgroundColor: 'gray',
    height: '100%',
  },
  imageButtonConfig: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },

  // Text styles
  textTitle: {
    color: 'white',
    fontSize: fontSizeBig,
  },
  textContent: {
    color: 'white',
    fontSize: fontSizeMedium,
  },
  textOption: {
    color: 'white',
    fontSize: fontSizeMedium,
  },
  textAdBanner: {
    color: 'gray-900',
    fontSize: fontSizeSmall,
    textAlign: 'center',
  },
});
