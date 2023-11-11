import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Carousel from "react-native-new-snap-carousel";
import ScreenWrapper from "../../ScreenWrapper";

const { width } = Dimensions.get("window");
const slideWidth = width - 8;

const slides = [
  {
    id: 1,
    imageSource: require("../assets/TunnelDog.png"),
  },
  {
    id: 2,
    imageSource: require("../assets/FrisbeeDog.png"),
  },
  {
    id: 3,
    imageSource: require("../assets/ListenDog.png"),
  },
];

const Training = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slideOne}>
        <Image source={item.imageSource} style={styles.imageOne} />
      </View>
    );
  };

  const snapOffsets = slides.map((_, index) => index * slideWidth);

  return (
    <ScreenWrapper navigation={navigation}>
      <Carousel
        data={slides}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={slideWidth}
        loop={false}
        loopClonesPerSide={slides.length}
        firstItem={0}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        snapToOffsets={snapOffsets}
      />
    </ScreenWrapper>
  );
};

export default Training;

const styles = StyleSheet.create({
  slideOne: {
    width: slideWidth,
    height: 275,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  imageOne: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
});
