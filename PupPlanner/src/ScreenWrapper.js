import React from "react";
import { View } from "react-native";
import NavBar from "./NavBar";

const ScreenWrapper = ({ children, navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <NavBar navigation={navigation} />
      {children}
    </View>
  );
};

export default ScreenWrapper;
