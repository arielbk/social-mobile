import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

const signOutUser = () => {
  firebase.auth().signOut();
}

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
    <TouchableOpacity style={{ marginTop: 32 }} onPress={signOutUser}>
        <Text>Logout</Text>
      </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ProfileScreen;
