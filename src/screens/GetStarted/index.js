import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import AuthContainer from '../../components/AuthContainer';
import Icon from '../../components/Icon';
import { Color, GlobalStyle } from '../../theme';

const GetStarted = ({ navigation }) => {
  const BottomView = () => {
    return (
      <View style={GlobalStyle.buttonContainer}>
        <Button
          mode="contained"
          style={{ ...GlobalStyle.button, marginBottom: 10 }}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={GlobalStyle.buttonText}>Sign Up</Text>
        </Button>
        <Button
          mode="contained"
          style={{ ...GlobalStyle.button, backgroundColor: "#fff" }}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{ ...GlobalStyle.buttonText, color: "#2b2b2b" }}>Sign In</Text>
        </Button>
      </View>
    );
  };

  return (

    <AuthContainer getStarted={1} bottomArea={<BottomView />}>
      <View style={GlobalStyle.innerContainer}>
        <Text style={GlobalStyle.heading}>Get Started</Text>
        <Text style={GlobalStyle.text}>
          Start With Signing Up Or Sigin In
        </Text>
        <Icon name="md-chatbubbles-outline" iconFamily="Ionicons" size={120} color={Color.primary} style={{ marginTop: 30 }} />
      </View>

    </AuthContainer>

  );
};

export default GetStarted;
