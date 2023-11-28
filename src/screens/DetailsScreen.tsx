import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({navigation, route}: any) => {
  const itemOfIndex = useStore((state: any) =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);

  const deleteFromFavouriteList = useStore(
    (state: any) => state.deleteFromFavouriteList,
  );

  const addToCart = useStore((state: any) => state.addToCart);

  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(itemOfIndex.prices[0]);

  //console.log('route=', route);

  const BackHandler = () => {
    navigation.pop();
  };

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavouriteList(type, id) : addToFavoriteList(type, id);
  };

  const addToCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.push('Tab', {screen: 'Cart'});
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={itemOfIndex.imagelink_portrait}
          type={itemOfIndex.type}
          id={itemOfIndex.id}
          favourite={itemOfIndex.favourite}
          name={itemOfIndex.name}
          special_ingredient={itemOfIndex.special_ingredient}
          ingredients={itemOfIndex.ingredients}
          average_rating={itemOfIndex.average_rating}
          ratings_count={itemOfIndex.rating_count}
          roasted={itemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={styles.DescriptionText}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={styles.DescriptionText} numberOfLines={3}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {itemOfIndex.prices.map((data: any) => {
              return (
                <TouchableOpacity
                  key={data.size}
                  onPress={() => {
                    setPrice(data);
                  }}
                  style={[
                    styles.SizeBox,
                    {
                      borderColor:
                        data.size === price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryDarkGreyHex,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize:
                          itemOfIndex.type === 'bean'
                            ? FONTSIZE.size_14
                            : FONTSIZE.size_16,
                        color:
                          data.size === price.size
                            ? COLORS.primaryOrangeHex
                            : COLORS.primaryLightGreyHex,
                      },
                    ]}>
                    {data.size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonPressHandler={() => {
            addToCartHandler({
              id: itemOfIndex.id,
              index: itemOfIndex.index,
              name: itemOfIndex.name,
              roasted: itemOfIndex.roasted,
              imagelink_square: itemOfIndex.imagelink_square,
              special_ingredient: itemOfIndex.special_ingredient,
              type: itemOfIndex.type,
              price: price,
            });
          }}
          buttonTitle="Add to Cart"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
    paddingVertical: 20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
