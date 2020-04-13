import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import HomeScreen from './screens/HomeScreen';
import MessageScreen from './screens/MessageScreen';
import PostScreen from './screens/PostScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';

import firebase from 'firebase';
import '@firebase/firestore';

const AppStack = createStackNavigator();
const AppTab = createBottomTabNavigator();

const TabNavigation = () => (
  <AppTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Post') {
          return (
            <View style={{
              width: 42,
              height: 42,
              borderRadius: 24,
              backgroundColor: '#007AFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Ionicons name="ios-add" size={36} color="#fff" />
            </View>
          )
        }

        let iconName;
        if (route.name === 'Home') (iconName = 'ios-home');
        if (route.name === 'Message') (iconName = 'ios-chatboxes');
        if (route.name === 'Notification') (iconName = 'ios-notifications');
        if (route.name === 'Profile') (iconName = 'ios-person');

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#919191',
      inactiveTintColor: '#D2D2D2',
      showLabel: false,
    }}
    navigationOptions={{
      tabBarOnPress: ({navigation, defaultHandler}) => {
        if (navigation.state.key === 'post') {
          console.log('opening post modal');
          navigation.navigate('postModal');
        } else {
          defaultHandler();
        }
      }
    }}
  >
    <AppTab.Screen name="Home" component={HomeScreen} />
    <AppTab.Screen name="Message" component={MessageScreen} />
    <AppTab.Screen name="Post" component={PostScreen} />
    <AppTab.Screen name="Notification" component={NotificationScreen} />
    <AppTab.Screen name="Profile" component={ProfileScreen} />
  </AppTab.Navigator>
);

const AppNavigation = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="Main" component={TabNavigation} />
    <AppStack.Screen name="postModal" component={PostScreen} mode="modal" />
  </AppStack.Navigator>
);

const AuthStack = createStackNavigator();
const AuthNavigation = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  firebase.auth().onAuthStateChanged(user => {
    setIsLoggedIn(!!firebase.auth().currentUser)
  });

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigation /> : <AuthNavigation />}

    </NavigationContainer>
)};

export default App;