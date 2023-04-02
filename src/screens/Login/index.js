import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import {Color, GlobalStyle} from '../../theme';
import AuthContainer from '../../components/AuthContainer';
import { showMessage } from "react-native-flash-message";

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      alert('Fill all fields');
    }

    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (err) {
      // alert(err.message);
      showMessage({
        message: err.message,
        type: "danger",
      });
      setLoading(false);
    }
  };

  const BottomView = () => {
    return (
      <>
        <Text style={{textAlign:'center'}}>Don't Have An Account?</Text>
        <TouchableOpacity
          style={GlobalStyle.signUpInText}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={GlobalStyle.signUpInLink}>Sign Up Here</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <View
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Color.primary} />
        </View>
      ) : (
        <AuthContainer bottomArea={<BottomView />}>
          <KeyboardAvoidingView
            behavior="position"
            style={GlobalStyle.mainContainer}>
            <View style={GlobalStyle.innerContainer}>
              <Text style={GlobalStyle.heading}>Login</Text>
              <Text style={GlobalStyle.text}>
                Remember to get up & stretch once in a while - your friends at
                chat.
              </Text>
            </View>
            <View style={GlobalStyle.inputArea}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={GlobalStyle.inputs}
              />
              <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                style={GlobalStyle.inputs}
              />
              <View style={GlobalStyle.buttonContainer}>
                <Button
                  mode="contained"
                  style={GlobalStyle.button}
                  disabled={email === '' || password === '' ? true : false}
                  onPress={() => userLogin()}>
                  <Text style={GlobalStyle.buttonText}>Sign In</Text>
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </AuthContainer>
      )}
    </>
  );
};

export default Login;
