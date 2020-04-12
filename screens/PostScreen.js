import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Image, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Fire from '../Fire';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../utilities/UserPermissions';

require('firebase/firestore');

const PostScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

useEffect(() => {
    UserPermissions.getCameraPermission();
  }, []);

useEffect(() => {
  const unsubscribe = navigation.addListener('tabPress', e => {
    // Prevent default behavior
    e.preventDefault();

    // Do something manually
    navigation.navigate('postModal')
  });

  return unsubscribe;
}, [navigation]);

  const handlePost = () => {
    Fire.shared.addPost({ text, localUri: image })
      .then(ref => {
        setText('');
        setImage();
        navigation.goBack();
      })
    .catch(err => {
      alert(err);
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="md-arrow-back" size={24} color="#d8d9db" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost}>
          <Text style={{ fontWeight: '500' }}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image source={require("../assets/tempAvatar.jpg")} style={styles.avatar} />
        <TextInput
          autofocus={true}
          multiline={true}
          numberOfLines={4}
          style={{ flex: 1 }}
          placeholder="Want to share something?"
          onChangeText={text => setText(text)}
          value={text}
        />
      </View>

      <TouchableOpacity style={styles.photo} onPress={pickImage}>
        <Ionicons name="md-camera" size={32} color="#d8d9db" />
      </TouchableOpacity>

      {image ? (
        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150}}>
          <Image source={{ uri: image }} style={{width: '100%', height: '100%' }} />
        </View>
      ) : null}
    </SafeAreaView>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d9db',
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
  }
});

export default PostScreen;
