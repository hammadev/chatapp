import {Dimensions} from 'react-native';

const Color = {
  primary: '#428cee',
  headerBg: '#c6d2f3',
  bodyBg: '#dbe2fa',
};

const Font = {
  light: 'Poppins-Light',
  extralight: 'Poppins-ExtraLight',

  regular: 'Poppins-Regular',
  meduim: 'Poppins-Medium',

  bold: 'Poppins-Bold',
  semibold: 'Poppins-SemiBold',
  extrabold: 'Poppins-ExtraBold',
};

const Window = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  fixPadding: 15,
};

const GlobalStyle = {
  mainContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    width:'100%'
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  heading: {
    fontSize: 32,
    color: '#2b2b2b',
    fontFamily: Font.bold,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#2b2b2b',
    fontFamily: Font.regular,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  inputs: {
    height: 65,
    marginBottom: 10,
    backgroundColor: Color.headerBg,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  button: {
    height: 55,
    borderRadius: 50,
    justifyContent: 'center',
    width: '70%',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Font.meduim,
  },
  signUpInText: {
    marginTop: 10,
    alignItems: 'center',
  },
  signUpInLink: {
    fontWeight: '500',
    color: Color.primary,
  },
};

export {Color, Font, GlobalStyle, Window};
