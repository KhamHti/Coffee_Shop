import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {useStore} from '../store/store';
// import Icon from 'react-native-vect or-icons/MaterialCommunityIcons';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import CoffeeCard from '../components/CoffeeCard';

const getCategoriesFromData = (data: any) => {
  let temp: any = [];

  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name === category);
    return coffeelist;
  }
};

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState(undefined);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 1,
    category: categories[1],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );

  const tabBarHeight = useBottomTabBarHeight();
  const ListRef: any = useRef<FlatList>();

  // console.log('asdf:: =>', sortedCoffee.length );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.ScrollViewFlex}
        showsVerticalScrollIndicator={false}>
        <AppBar title="HomeScreen" />

        <Text style={styles.screenTitle}>
          Find the best {'\n'}coffee for you
        </Text>
        <SearchBar />

        {/* category scroll section */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => {
            return (
              <View
                key={index.toString()}
                style={styles.categoryScrollViewContainer}>
                <TouchableOpacity
                  onPress={() => {
                    // android flat list scroll view bugs
                    ListRef?.current?.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
                    setCategoryIndex({
                      index: index,
                      category: categories[index],
                    });
                    setSortedCoffee([
                      ...getCoffeeList(categories[index], CoffeeList),
                    ]);
                  }}
                  style={styles.categoryScrollViewItem}>
                  <Text
                    style={[
                      styles.categoryText,
                      categoryIndex.index === index
                        ? {color: COLORS.primaryOrangeHex}
                        : {},
                    ]}>
                    {data}
                  </Text>
                  {categoryIndex.index === index ? (
                    <View style={styles.activeCategory} />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* coffee flatlist */}
        <FlatList
          ref={ListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  rosted={item.rosted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />

        {/* beans flatlist */}
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[
            styles.flatListContainer,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  rosted={item.rosted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />

        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryScrollViewItem: {
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: SPACING.space_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  CoffeeBeansTitle: {
    marginTop: SPACING.space_20,
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
});
