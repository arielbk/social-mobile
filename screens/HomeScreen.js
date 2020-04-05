import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';



const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const {email: fetchedEmail, displayName: fetchedDisplayName} = firebase.auth().currentUser;
    setEmail(fetchedEmail);
    setDisplayName(fetchedDisplayName);
  }, []);

  const signOutUser = () => {
    firebase.auth().signOut();
  }

  return (
    <View style={styles.container}>
      <Text>Hi {email}!</Text>

      <TouchableOpacity style={{ marginTop: 32 }} onPress={signOutUser}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
)};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
