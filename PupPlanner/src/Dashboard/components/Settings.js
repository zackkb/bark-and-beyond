import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "../../NavBar";

const Settings = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
