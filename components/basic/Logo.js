import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {images} from '../../constanst';

export default function Logo() {
  return <Image source={images.icons.logo} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
});
