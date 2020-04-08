import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import Fire from '../Fire';


const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'App' : 'Auth');
    })
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading Screen...</Text>
      <ActivityIndicator size="large" />
    </View>
)};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
