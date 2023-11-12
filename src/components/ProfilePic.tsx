import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../theme/theme';

const img = require('../assets/app_images/avatar.png');

const ProfilePic = () => {
  return (
    <View style={styles.imgContainer}>
      <Image source={img} style={styles.imgStyle} />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  imgContainer: {
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
    width: SPACING.space_36,
    height: SPACING.space_36,
  },
  imgStyle: {
    width: SPACING.space_36,
    height: SPACING.space_36,
  },
});
