import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color, Window } from '../../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AuthContainer = props => {
  return (
    <KeyboardAwareScrollView style={styles.bg}>
      <View style={{...styles.curvedbg, height: props.getStarted ? Window.height /1.4 : Window.height /1.2,}}>{props.children}</View>
      <View style={styles.bottomWrapper}>{props.bottomArea}</View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Color.bodyBg,
    flex: 1,
    paddingBottom: 15,
  },
  bottomWrapper: {
    paddingVertical: 15,
  },
  curvedbg: {
    backgroundColor: Color.headerBg,
    paddingBottom: 15,
    paddingHorizontal: 15,
    // flex: 1,
    justifyContent:'center',
    alignItems:'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});

export default AuthContainer;
