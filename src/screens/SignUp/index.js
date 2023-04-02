import React, { useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Color, GlobalStyle } from '../../theme';
import AuthContainer from '../../components/AuthContainer';
import { showMessage } from "react-native-flash-message";

function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userSignup = async () => {
    setLoading(true);
    if (!email || !password || !name) {
      alert('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      firestore().collection('users').doc(result.user.uid).set({
        name: name,
        email: result.user.email,
        uid: result.user.uid
      }).then(() => {
        console.log('User added!');
      }).catch((err) => {
        console.log(err);
      });
      setLoading(false);
    } catch (err) {
      let message = '';
      if (err.code === 'auth/email-already-in-use')
        message = 'That email address is already in use!';
      else if (err.code === 'auth/invalid-email')
        message = 'That email address is invalid!';
      else
        message = err.message;
      
        showMessage({
          message: message,
          type: "danger",
        });
      // alert(message);
      setLoading(false);
    }
  };


  const BottomView = () => {
    return (
      <>
        <Text style={{textAlign:'center'}}>Already Have An Account?</Text>
        <TouchableOpacity
          style={GlobalStyle.signUpInText}
          onPress={() => navigation.goBack()}>
          <Text style={GlobalStyle.signUpInLink}>Login</Text>
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
              <Text style={GlobalStyle.heading}>Register</Text>
              <Text style={GlobalStyle.text}>
                You and Your Friends always Connected
              </Text>
            </View>
            <View style={GlobalStyle.inputArea}>

              <TextInput
                label="Name"
                value={name}
                onChangeText={text => setName(text)}
                style={GlobalStyle.inputs}
              />
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
                  disabled={email === '' || password === '' || name === '' ? true : false}
                  onPress={() => userSignup()}>
                  <Text style={GlobalStyle.buttonText}>Sign Up</Text>
                </Button>
              </View>

            </View>
          </KeyboardAvoidingView>
        </AuthContainer>
      )}
    </>
  );
}

export default SignUp;
