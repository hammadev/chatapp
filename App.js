import React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Navigation from './src/components/Navigation';
import { Color } from './src/theme';
import FlashMessage from "react-native-flash-message";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.primary,
  },
};

const App = () => {
  return (

    <PaperProvider theme={theme}>
      <Navigation />
      <FlashMessage position="top" duration={3000} />

    </PaperProvider>

  );
};


export default App;
