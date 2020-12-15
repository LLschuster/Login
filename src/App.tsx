

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Nav from "./Router";

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <Nav />     
    </>
  );
};

const styles = StyleSheet.create({
});

export default App;
