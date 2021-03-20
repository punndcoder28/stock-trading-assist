import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
