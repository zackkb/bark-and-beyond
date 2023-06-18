import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "../../NavBar";

const Services = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <Text>Services</Text>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
