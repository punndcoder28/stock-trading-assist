/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import Button from '../../components/basic/Button';
import Header from '../../components/basic/Header';
import {colors} from '../../components/basic/theme';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      showSpinner: true,
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('userData').then(data => {
      console.log(data);
      data = JSON.parse(data);
      this.setState({
        showSpinner: false,
        name: data.data.name,
        phone: data.data.phone,
      });
    });
  }
  logout() {
    AsyncStorage.multiRemove(
      ['userData', 'questionnaireAnswered'],
      (error, data) => {
        const resetActionLogin = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'LoginStack'})],
        });
        this.props.navigation.dispatch(resetActionLogin);
      },
    );
  }
  render() {
    return (
      <View style={{flex: 1, padding: 10, backgroundColor: colors.white}}>
        {this.state.showSpinner ? (
          <ActivityIndicator />
        ) : (
          <>
            <Header>Profile</Header>
            <Header>Name: {this.state.name}</Header>
            <Header>Phone: {this.state.phone}</Header>
            <Button
              mode="contained"
              onPress={() => this.logout()}
              style={{position: 'absolute', alignSelf: 'center', bottom: 40}}>
              Log out
            </Button>
          </>
        )}
      </View>
    );
  }
}
