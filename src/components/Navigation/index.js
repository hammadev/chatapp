import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import SignUp from '../../screens/SignUp';

import auth from '@react-native-firebase/auth';
import Home from '../../screens/Home';

import ChatScreen from '../../screens/ChatScreen';
import { Color } from '../../theme';
import { StatusBar } from 'react-native';
import GetStarted from '../../screens/GetStarted';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const unRegister = auth().onAuthStateChanged(userExist => {
      userExist ? setUser(userExist) : setUser('');
    });

    return () => {
      unRegister();
    };
  }, []);

  return (
    <NavigationContainer theme={{ colors: Color.bodyBg }}>
      <StatusBar backgroundColor={Color.headerBg} barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              options={{ animation: 'slide_from_bottom' }}>
              {props => <Home {...props} user={user} />}
            </Stack.Screen>

            <Stack.Screen
              name="Chat"
              options={{ animation: 'slide_from_bottom' }}>
              {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Signup"
              component={SignUp}
              options={{ animation: 'slide_from_right' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
