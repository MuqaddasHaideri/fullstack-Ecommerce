import { StyleSheet, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get("window");

const Crousal = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = [
    { id: "1", image: require("../assets/images/image1.jpeg") },
    { id: "2", image: require("../assets/images/image2.jpeg") },
    { id: "3", image: require("../assets/images/image3.jpeg") },
  ];

  const renderBanner = ({ item }: { item: any }) => (
    <TouchableOpacity activeOpacity={0.7} style={styles.bannerWrapper}>
      <Image source={item.image} style={styles.bannerImage} />
      {/* Pagination Dots inside the image */}
      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );

  const onScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / (width - 40));
    setActiveIndex(slide);
  };

  return (
    <View>
      <FlatList
        data={banners}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Crousal;

const styles = StyleSheet.create({
  bannerWrapper: {
    marginHorizontal: 10,
  },
  bannerImage: {
    width: width - 40,
    height: 150,
    borderRadius: 10,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.background,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.smallText,
    width: 10,
    height: 10,
  },
});
