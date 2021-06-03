import React from 'react';

import {Platform, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginPage from '../screens/Login/LoginPage';
import SignUpPage from '../screens/SignUp/SignUpPage';

import QuestionnairePage from '../screens/Home/QuestionnairePage';
import HomePage from '../screens/Home/HomePage';
import Profile from '../screens/Profile/Profile';

let Navigation;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.createNavigation();
  }

  createNavigation() {
    let defaultNavigationOptions = {
      defaultNavigationOptions: {
        headerStyle: {
          height: 40,
        },
        headerBackImage: () => null,
        headerBackTitle: null,
        headerTitle: () => null,
        headerBackTitleVisible: false,
        headerLayoutPreset: 'center',
        headerLeftContainerStyle: {
          alignItems: 'center',
          marginLeft: Platform.OS === 'android' ? 0 : 16,
          paddingRight: 8,
        },
        headerRightContainerStyle: {
          alignItems: 'center',
          marginLeft: 16,
          paddingRight: 8,
        },
      },
    };

    if (Platform.OS === 'android') {
      defaultNavigationOptions.defaultNavigationOptions.headerLeft = () => (
        <View />
      );
      defaultNavigationOptions.defaultNavigationOptions.headerRight = () => (
        <View />
      );
    }

    const LoginStack = createStackNavigator(
      {
        LoginPage,
        SignUpPage,
      },
      defaultNavigationOptions,
    );

    const HomeStack = createStackNavigator(
      {
        QuestionnairePage,
        HomePage,
        Profile,
      },
      defaultNavigationOptions,
    );

    const RootStack = createStackNavigator(
      {
        LoginStack,
        HomeStack,
      },
      defaultNavigationOptions,
    );

    Navigation = createAppContainer(RootStack);
  }

  render() {
    return <Navigation />;
  }
}
