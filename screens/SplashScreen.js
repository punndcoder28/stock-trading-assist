import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {images} from '../constanst/';

export default class InitialScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => this.props.navigation.navigate('LoginStack'), 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={images.icons.logo} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.COLORS.white,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
});
