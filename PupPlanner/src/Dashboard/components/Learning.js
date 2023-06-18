import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "../../NavBar";

const Learning = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <Text>Learning</Text>
    </View>
  );
};

export default Learning;

const styles = StyleSheet.create({});
