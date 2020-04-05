import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(err => setError(err.message))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>

      <View style={styles.errorMessage}>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={email => setEmail(email)}
            value={email}
          />
        </View>
        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput 
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={password => setPassword(password)}
            value={password}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: '#fff', fontWeight: '500' }}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }} onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#414959', fontSize: 13}}>
          New to SocialApp? <Text style={{ fontWeight: '500', color: '#e9446a'}}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
)};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 19, 
    fontWeight: '400',
    textAlign: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#e9446a',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8a8f9e',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8a8f9e',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161f3d',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#e0446a',
    borderRadius: 4,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
