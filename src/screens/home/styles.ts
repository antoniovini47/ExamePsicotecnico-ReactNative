import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // Container styles
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'black',
  },

  // Layout styles
  header: {
    backgroundColor: 'blue',
    fontSize: 24,
    color: 'white',
  },
  image: {
    backgroundColor: 'purple',
    alignItems: 'center',
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
    backgroundColor: 'yellow',
    height: 100,
  },
  footer: {
    flexDirection: 'row-reverse',
    backgroundColor: 'green',
    justifyContent: 'space-between',
  },

  //Component styles
  button: {
    backgroundColor: 'gray',
    height: '100%',
  },

  // Text styles
  textTitle: {
    color: 'white',
    fontSize: 36,
  },
  textContent: {
    color: 'white',
    fontSize: 24,
  },
  textOption: {
    color: 'white',
    fontSize: 24,
  },
});
