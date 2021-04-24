import React from 'react';

import { Platform } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { colors } from "../components/basic/theme"

import LoginPage from '../screens/Login/LoginPage';
import SignUpPage from '../screens/SignUp/SignUpPage';

import QuestionnairePage from '../screens/Home/QuestionnairePage';
import HomePage from '../screens/Home/HomePage';
import Profile from "../screens/Profile/Profile";

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
          backgroundColor: colors.white, // or 'white
          borderBottomColor: "transparent"
        },
        headerBackImage: null,
        headerBackTitle: null,
        headerLayoutPreset: "center",
        headerLeftContainerStyle: {
          alignItems: "center",
          marginLeft: Platform.OS === "android" ? 0 : 16,
          paddingRight: 8
        },
        headerRightContainerStyle: {
          alignItems: "center",
          marginLeft: 16,
          paddingRight: 8
        }
      },
    };

    if (Platform.OS === "android") {
      defaultNavigationOptions.defaultNavigationOptions.headerLeft = <View></View>;
      defaultNavigationOptions.defaultNavigationOptions.headerRight = <View></View>;
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
        Profile
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
