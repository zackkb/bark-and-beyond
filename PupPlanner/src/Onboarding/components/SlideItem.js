import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={item.img}
        resizeMode="contain"
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
  },
  image: {
    flex: 0.5,
    width: "100%",
    marginTop: 202,
  },
  content: {
    flex: 0.4,
    width: 295,
    height: 139,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    color: "#333",
  },
});
