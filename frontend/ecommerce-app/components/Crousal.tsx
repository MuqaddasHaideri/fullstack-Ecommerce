import React, { useRef, useState, useEffect } from "react";
import { 
  View, 
  FlatList, 
  Image, 
  Dimensions, 
  StyleSheet, 
  NativeSyntheticEvent, 
  NativeScrollEvent,
  TouchableOpacity 
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

interface CarouselProps {
  images?: any[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images = [
    require("../assets/images/image1.jpeg"),
    require("../assets/images/image1.jpeg"),
    require("../assets/images/image1.jpeg"),
  ],
  autoPlay = true,
  autoPlayInterval = 3000,
  showNavigation = true,
  showPagination = true
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  const goToNextSlide = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    setActiveIndex(nextIndex);
    flatListRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true
    });
  };

  const goToPrevSlide = () => {
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(prevIndex);
    flatListRef.current?.scrollToIndex({
      index: prevIndex,
      animated: true
    });
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true
    });
  };
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      autoPlayRef.current = setInterval(goToNextSlide, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, autoPlay, autoPlayInterval, images.length]);
  const handleManualScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    handleScroll(event);
    
    // Reset auto-play timer
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (autoPlay && images.length > 1) {
      autoPlayRef.current = setInterval(goToNextSlide, autoPlayInterval);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        ref={flatListRef}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleManualScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item} style={styles.image} />
          </View>
        )}
      />

      {/* Navigation Arrows */}
      {showNavigation && images.length > 1 && (
        <>
          <TouchableOpacity 
            style={[styles.navButton, styles.prevButton]} 
            onPress={goToPrevSlide}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navButton, styles.nextButton]} 
            onPress={goToNextSlide}
          >
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </>
      )}
      {showPagination && images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToSlide(index)}
            >
              <View
                style={[
                  styles.dot,
                  activeIndex === index ? styles.activeDot : null,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
  },
  slide: {
    width,
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pagination: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 5,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    margin: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 16,
  },
  navButton: {
    position: "absolute",
    top: "50%",
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  prevButton: {
    left: 10,
  },
  nextButton: {
    right: 10,
  },
});

export default Carousel;