import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import firebase from 'firebase';

const HomeScreen = () => {
  const [posts, setPosts] = useState();

  firebase.firestore().collection('posts').get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No posts found');
        return;
      }

      const fetchedPosts = [];
      snapshot.forEach(doc => fetchedPosts.push({ id: doc.id, ...doc.data()}));
      setPosts(fetchedPosts.sort((a, b) => b.timestamp - a.timestamp));
    })
    .catch(err => console.error(err));

  const renderPost = post => {
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <View style={styles.postHeader}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../assets/tempAvatar.jpg')} style={styles.avatar} />
              <View>
                <Text style={styles.name}>Post title</Text>
                <Text style={styles.timestamp}>
                  {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                </Text>
              </View>
            </View>

            <Ionicons name="ios-more" size={24} color="#73788b" />
          </View>

          <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
          <Text style={styles.post}>{post.text}</Text>
        </View>
      </View>
    )
  }

  if (!posts) return <ActivityIndicator size="large" />;
  console.log(posts);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.topBuffer} />
        )}
        style={styles.feed}
        data={posts}
        renderItem={({item}) => renderPost(item)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
)};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EBEC',
  },
  header: { 
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ebecf4',
    shadowColor: '#454d65',
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
    // marginTop: 32,
  },
  topBuffer: {
    height: 32,
  },
  feedItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 16,
    // flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: '#454d65',
  },
  timestamp: {
    fontSize: 11,
    color: '#c4c6ce',
    marginTop: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  post: {
    marginBottom: 16,
    fontSize: 14,
    color: '#838899',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  }
});
