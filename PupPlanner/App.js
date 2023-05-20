import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import "react-native-gesture-handler";

import "expo-dev-client";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Slider from "./src/Onboarding/components/Slider";
import SignUp from "./src/Onboarding/components/SignUp";
import Login from "./src/Onboarding/components/Login";
import CreateProfile from "./src/Onboarding/components/CreateProfile";
import CreateDogProfile from "./src/Onboarding/components/CreateDogProfile";

// keep or remove this?
/* import { enableScreens } from "react-native-screens";
enableScreens(); */

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
        <Stack.Screen
          name="Slider"
          component={Slider}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="CreateProfile"
          component={CreateProfile}
        />
        <Stack.Screen
          name="CreateDogProfile"
          component={CreateDogProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
