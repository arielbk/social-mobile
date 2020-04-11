import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Fire from '../Fire';
import UserPermissions from '../utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState();

  const [error, setError] = useState(null);

  const handleSignUp = () => {
    // firebase.auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(userCredentials => userCredentials.user.updateProfile({
    //     displayName: name,
    //   }))
    //   .catch(err => setError(err.message));
    Fire.shared.createUser({
      name,
      email,
      password,
      avatar,
    })
  };

  const handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Image
        source={require('../assets/authHeader.png')}
        style={{ width: 521, resizeMode: 'contain', marginLeft: -50, marginTop: -260, marginBottom: -160 }}
      />
      <Image
        source={require('../assets/authHeader.png')}
        style={{ width: 521, resizeMode: 'contain', position: 'absolute', bottom: -440, left: 100, opacity: 0.4 }}
      />

      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-round-back" size={32} color="#fff" />
      </TouchableOpacity>

      <View style={{ position: 'absolute', top: 64, alignItems: 'center', width: '100%'}}>
        <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>
        <TouchableOpacity style={styles.avatarPlaceholder} onPress={handlePickAvatar}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Ionicons name="ios-add" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#fff',
  },
  greeting: {
    marginTop: 32,
    fontSize: 19, 
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
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
  },
  back: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21, 22, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#e1e2e6',
    borderRadius: 48,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  }
});
