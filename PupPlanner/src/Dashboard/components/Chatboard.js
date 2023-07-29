import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import ScreenWrapper from "../../ScreenWrapper";
import AppContext from "./AppContext";

const Chatboard = ({ navigation }) => {
  const { selectedTab, setSelectedTab } = useContext(AppContext);

  useEffect(() => {
    setSelectedTab("Chatboard");
  }, []);

  return (
    <ScreenWrapper navigation={navigation}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("Network");
            navigation.navigate("Community");
          }}
        >
          <Text
            style={
              selectedTab === "Network"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Network
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("Play Date");
            navigation.navigate("Playdate");
          }}
        >
          <Text
            style={
              selectedTab === "Play Date"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Play Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("Chatboard")}>
          <Text
            style={
              selectedTab === "Chatboard"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Chatboard
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require("../assets/lin.png")} style={styles.image} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#B8DFA9",
  },
  navText: {
    color: "black",
  },
  navTextSelected: {
    textDecorationLine: "underline",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Chatboard;
