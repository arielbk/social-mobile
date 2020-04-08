//TODO: migrate this to react navigation v5
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import HomeScreen from './screens/HomeScreen';
import MessageScreen from './screens/MessageScreen';
import PostScreen from './screens/PostScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';

// import firebaseConfig from './firebaseConfig';
// import * as firebase from 'firebase';

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
          }
        },
        Message: {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatboxes" size={24} color={tintColor} />
          }
        },
        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => 
              <Ionicons
                name="ios-add-circle"
                size={48}
                color="#e9446a"
                style={{
                  shadowColor: '#e9446a',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowRadius: 10,
                  shadowOpacity: 0.3,
                }}
              />
          }
        },
        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={24} color={tintColor} />
          }
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
          }
        },
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if (navigation.state.key === 'post') {
              navigation.navigate('postModal')
            } else {
              defaultHandler();
            }
          }
        },
        tabBarOptions: {
          activeTintColor: '#161f3d',
          inactiveTintColor: '#b8bbc4',
          showLabel: false,
        }
      }
    ),
    postModal: {
      screen: PostScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    // initialRouteName: 'postModal',
  }
)

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: { headerShown: false }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: { headerShown: false }
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
);
