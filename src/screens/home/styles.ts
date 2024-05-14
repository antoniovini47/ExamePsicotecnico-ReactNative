import {StyleSheet, Dimensions} from 'react-native';

const paddingDefault = 10;
const paddingSmall = 5;

const fontSizeBig = 36;
const fontSizeMedium = 24;
const fontSizeSmall = 18;

const backgroundColor = 'black';
const textColor = 'white';

const adHeight = 50; //Alterar com base na documentação AdMob
const buttonHeight = 50;
const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  // Layout styles
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: backgroundColor,
  },
  header: {
    fontSize: fontSizeBig,
    color: textColor,
  },
  image: {
    width: screenWidth,
    height: (9 / 16) * screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  content: {
    flex: 5,
    padding: paddingDefault,
  },
  radioButton: {
    paddingTop: paddingSmall,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  adBanner: {
    height: adHeight,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: paddingDefault,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  //Component styles
  mainButton: {
    backgroundColor: textColor,
    height: buttonHeight,
    paddingLeft: paddingSmall,
    paddingRight: paddingSmall,
  },
  imageButtonConfig: {
    height: buttonHeight,
    width: buttonHeight,
    resizeMode: 'contain',
  },
  slider: {
    backgroundColor: textColor,
    paddingTop: paddingDefault,
    height: buttonHeight,
  },

  // Text styles
  textTitle: {
    color: textColor,
    fontSize: fontSizeBig,
    textAlign: 'center',
  },
  textContent: {
    color: textColor,
    fontSize: fontSizeMedium,
    textAlign: 'center',
    paddingBottom: paddingDefault,
  },
  textOption: {
    color: textColor,
    fontSize: fontSizeSmall,
  },
  textAdBanner: {
    color: 'darkgray',
    fontSize: fontSizeSmall,
    textAlign: 'center',
  },
  textButton: {
    color: backgroundColor,
    fontSize: fontSizeBig,
    textAlign: 'center',
  },
});
