import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "../../NavBar";
import ScreenWrapper from "../../ScreenWrapper";

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
