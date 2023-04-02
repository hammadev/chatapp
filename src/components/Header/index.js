import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Color, Font, Window } from '../../theme';
import Icon from '../Icon';

const IconsSize = 26;

const LeftIcons = ({ leftIcon, navigation }) => {
  switch (leftIcon) {
    case 'back':
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrowleft"
            iconFamily="AntDesign"
            color="#2b2b2b"
            size={IconsSize}
          />
        </TouchableOpacity>
      );
    case 'close':
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="close"
            iconFamily="AntDesign"
            color="#2b2b2b"
            size={IconsSize}
          />
        </TouchableOpacity>
      );
    default:
      return (
        <Image
          source={leftIcon}
          style={{
            height: IconsSize * 2,
            width: IconsSize * 2,
            resizeMode: 'contain',
          }}
        />
      );
  }
};

const Header = ({ title = '', leftIcon, rightIcon }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        {leftIcon &&
          <LeftIcons leftIcon={leftIcon} navigation={navigation} />
        }
        <Text
          style={{
            ...styles.headerText,
            paddingLeft: leftIcon ? Window.fixPadding * 1.5 : 0,
          }}>
          {title}
        </Text>
      </View>
      {rightIcon &&
        <View style={styles.rightIconsArea}>
          {rightIcon.map((item, index) => (
            <View key={index} style={styles.flexRow}>
              <TouchableOpacity onPress={() => item.onPressFunction()}>
                <Icon
                  name={item.iconName}
                  iconFamily={item.iconFamily}
                  color="#2b2b2b"
                  size={IconsSize}
                />
              </TouchableOpacity>
              {rightIcon.length - 1 !== index ? (
                <View style={{ width: 15 }} />
              ) : null}
            </View>
          ))}
        </View>
      }
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.headerBg,
    paddingHorizontal: Window.fixPadding * 2,
    paddingVertical: Window.fixPadding * 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#2b2b2b',
    fontSize: 26,
    fontFamily: Font.bold,
  },
  rightIconsArea: {
    flexDirection: 'row',
  },
});
