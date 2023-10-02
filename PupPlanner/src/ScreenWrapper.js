import React from "react";
import { View } from "react-native";
import NavBar from "./NavBar";

const ScreenWrapper = ({ children, navigation }) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { navigation });
    }
    return child;
  });

  return (
    <View style={{ flex: 1 }}>
      <NavBar navigation={navigation} />
      {childrenWithProps}
    </View>
  );
};

export default ScreenWrapper;
