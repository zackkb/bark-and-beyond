import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Slider from "./src/Onboarding/components/Slider";
import SignUp from "./src/Onboarding/components/SignUp";
import Login from "./src/Onboarding/components/Login";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Slider"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Slider" component={Slider} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
