import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyANn23iyAEOso7NxLZILvqXIhugIGi915I",
  authDomain: "socialapp-1a6d9.firebaseapp.com",
  databaseURL: "https://socialapp-1a6d9.firebaseio.com",
  projectId: "socialapp-1a6d9",
  storageBucket: "socialapp-1a6d9.appspot.com",
  messagingSenderId: "340201954980",
  appId: "1:340201954980:web:e52218a6fc58d808f6d031"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
)