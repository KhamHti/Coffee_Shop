import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Icon name="home" size={25} color="red" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
