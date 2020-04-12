import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Fire from '../Fire';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const uid = Fire.shared.uid;
    const unsubscribe = Fire.shared.firestore
      .collection('users')
      .doc(uid)
      .onSnapshot(doc => {
          const user = doc.data();
          setName(user.name);
          setAvatar(user.avatar);
        });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 64, alignItems: 'center' }}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={avatar ? { uri: avatar } : require('../assets/tempAvatar.jpg') }
          />
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>21</Text>
          <Text style={styles.statTitle}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>981</Text>
          <Text style={styles.statTitle}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>63</Text>
          <Text style={styles.statTitle}>Following</Text>
        </View>
      </View>
      <Button onPress={() => Fire.shared.signOut()} title="Log out" /> 
    </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    shadowColor: '#151734',
    shadowRadius: 15,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 32,    
  },
  stat: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  statAmount: {
    color: '#4F566D',
    fontSize: 18,
    fontWeight: '300',
  },
  statTitle: {
    color: '#c3c5cd',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  }
});

export default ProfileScreen;
