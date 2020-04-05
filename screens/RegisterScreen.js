import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = ({ navigation }) => {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => userCredentials.user.updateProfile({
        displayName: name,
      }))
      .catch(err => setError(err.message));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>

      <View style={styles.errorMessage}>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={name => setName(name)}
            value={name}
          />
        </View>
        <View style={{ marginTop: 32 }}>
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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={{ color: '#fff', fontWeight: '500' }}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }} onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#414959', fontSize: 13}}>
          Already have an account? <Text style={{ fontWeight: '500', color: '#e9446a'}}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
)};

export default RegisterScreen;

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
