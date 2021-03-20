import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Platform} from 'react-native';
import {images} from '../../constanst';

export default function BackButton({goBack}) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image style={styles.image} source={images.icons.backArrow} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 0,
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});
