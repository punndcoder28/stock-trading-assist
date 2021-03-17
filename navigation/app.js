import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginPage from '../screens/Login/LoginPage';
import SignUpPage from '../screens/SignUp/SignUpPage';

import QuestionnairePage from '../screens/Home/QuestionnairePage';
import HomePage from '../screens/Home/HomePage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.createNavigation();
  }

  createNavigation() {
    let defaultNavigationOptions = {
      defaultNavigationOptions: {
        headerShown: false,
      },
    };

    if (Platform.OS === 'android') {
      defaultNavigationOptions.defaultNavigationOptions.headerLeft = null;
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
