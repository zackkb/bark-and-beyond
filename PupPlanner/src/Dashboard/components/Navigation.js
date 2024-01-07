import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Carousel from "react-native-new-snap-carousel";

const { width } = Dimensions.get("window");
const slideWidth = width * 0.45;

const slides = [
  {
    id: 1,
    backgroundColor: "#B8DFA9",
    imageSource: require("../assets/services.png"),
    title: "Services",
  },
  {
    id: 2,
    backgroundColor: "#BAE7FF",
    imageSource: require("../assets/learning.png"),
    title: "Learning",
  },
  {
    id: 3,
    backgroundColor: "#FFD773",
    imageSource: require("../assets/community.png"),
    title: "Community",
  },
];

const Navigation = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Image source={item.imageSource} style={styles.image} />
        <Text style={styles.text}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Navigation</Text>
      <View style={styles.content}>
        <Carousel
          data={slides}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={slideWidth}
          inactiveSlideScale={0.8}
          loop={true}
          loopClonesPerSide={slides.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24,
  },
  slide: {
    width: slideWidth,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 230,
  },
  image: {
    height: 142,
  },
  text: {
    fontSize: 16,
    marginTop: 18,
    fontWeight: "semibold",
    color: "#FCFCFC",
  },
});

export default Navigation;
