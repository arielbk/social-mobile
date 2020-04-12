import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';

const posts = [
  {
    id: '1',
    name: 'Some name',
    text: 'Some lorem ipsum text in here until it feels like it has been enough. I wonder how much text is in the original video. Let us just see ',
    timestamp: '159110273742',
    avatar: require('../assets/tempAvatar.jpg'),
    image: require('../assets/tempAvatar.jpg'),
  },
  {
    id: '2',
    name: 'Some name',
    text: 'Some lorem ipsum text in here until it feels like it has been enough. I wonder how much text is in the original video. Let us just see what happens if I keep on typing until the end of the line here like this. Yeah? Nah! We shall see what tidings the future hides.',
    timestamp: '159110273742',
    avatar: require('../assets/tempAvatar.jpg'),
    image: require('../assets/tempAvatar.jpg'),
  },
  {
    id: '3',
    name: 'Some name',
    text: 'Some lorem ipsum text in here until it feels like it has been enough. I wonder how much text is in the original video. Let us just see what happens if I keep on typing until the end of the line here like this. Yeah? Nah! We shall see what tidings the future hides.',
    timestamp: '159110273742',
    avatar: require('../assets/tempAvatar.jpg'),
    image: require('../assets/tempAvatar.jpg'),
  },
  {
    id: '4',
    name: 'Some name',
    text: 'Some lorem ipsum text in here until it feels like it has been enough. I wonder how much text is in the original video. Let us just see what happens if I keep on typing until the end of the line here like this. Yeah? Nah! We shall see what tidings the future hides.',
    timestamp: '159110273742',
    avatar: require('../assets/tempAvatar.jpg'),
    image: require('../assets/tempAvatar.jpg'),
  },
]

const HomeScreen = () => {
  const renderPost = post => {
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <View style={styles.postHeader}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={post.avatar} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{post.name}</Text>
                <Text style={styles.timestamp}>
                  {formatDistanceToNow(Date.now() - 10000000, { addSuffix: true })}
                </Text>
              </View>
            </View>

            <Ionicons name="ios-more" size={24} color="#73788b" />
          </View>

          <Image source={post.image} style={styles.postImage} resizeMode="cover" />
          <Text style={styles.post}>{post.text}</Text>

          {/* <View style={{ flexDirection: 'row' }}>
            <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }} />
            <Ionicons name="ios-chatboxes" size={24} color="#73788B"  />
          </View> */}
        </View>
      </View>
    )
  }

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
