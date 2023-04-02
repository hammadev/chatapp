import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../../theme';

const BodyContainer = props => {
  return (
    <View style={styles.bg}>
      <View style={styles.curvedbg}>{props.children}</View>
    </View>

  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Color.headerBg,
    flex: 1,
  },
  curvedbg: {
    backgroundColor: Color.bodyBg,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});

export default BodyContainer;
