// import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import * as React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import Container from "./container";
import {SSRProvider} from '@react-aria/ssr'; 

export default function App() {


  const customeColor = {
    primary: {
      50: "#FAFAFA",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      400: "#FF5757",
      500: "#0088CC",
      600: "#007AB8",
      700: "#930707",
      800: "#9f1239",
      900: "#1c1917",
    },
    amber: {
      400: "#d97706",
    },
  };
  
  const theme = extendTheme({
    colors: customeColor,
  });
  return (
    
    <NativeBaseProvider theme={theme}>
      <Container />
    </NativeBaseProvider>
  );
}


