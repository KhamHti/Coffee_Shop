import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTFAMILY, SPACING} from '../theme/theme';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('asdf')}>
        <Icon
          name="magnify"
          size={SPACING.space_30}
          color={
            searchText.length > 0
              ? COLORS.primaryOrangeHex
              : COLORS.primaryLightGreyHex
          }
          style={styles.inputIcon}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Find your coffee...."
        value={searchText}
        onChangeText={text => setSearchText(text)}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={styles.inputContainerStyle}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.space_20,
    borderRadius: SPACING.space_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  inputContainerStyle: {
    flex: 1,
    height: SPACING.space_20 * 2,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: SPACING.space_15,
    color: COLORS.primaryWhiteHex,
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
});
