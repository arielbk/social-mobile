import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationScreen = () => (
  <View style={styles.container}>
    <Text>Notification Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default NotificationScreen;
