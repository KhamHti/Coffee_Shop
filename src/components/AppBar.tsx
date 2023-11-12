import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

interface AppBarProps {
  title?: string;
}

const AppBar: React.FC<AppBarProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <GradientBGIcon
        name="view-grid"
        size={SPACING.space_16}
        color={COLORS.primaryLightGreyHex}
      />
      <Text style={styles.headerText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.space_30,
    //backgroundColor: 'white',
  },
  headerText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});
