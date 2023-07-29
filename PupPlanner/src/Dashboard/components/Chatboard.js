import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ScreenWrapper from "../../ScreenWrapper";

const Chatboard = ({ navigation }) => {
  const [selectedSection, setSelectedSection] = useState("Play Date");

  return (
    <ScreenWrapper navigation={navigation}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => {
            setSelectedSection("Network");
            navigation.navigate("Community");
          }}
        >
          <Text
            style={
              selectedSection === "Network"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Network
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedSection("Play Date");
            navigation.navigate("Playdate");
          }}
        >
          <Text
            style={
              selectedSection === "Play Date"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Play Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedSection("Chatboard")}>
          <Text
            style={
              selectedSection === "Chatboard"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Chatboard
          </Text>
        </TouchableOpacity>
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
    color: "blue",
  },
});

export default Chatboard;
