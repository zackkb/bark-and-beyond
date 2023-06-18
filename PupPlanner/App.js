import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Slider from "./src/Onboarding/components/Slider";
import SignUp from "./src/Onboarding/components/SignUp";
import Login from "./src/Onboarding/components/Login";
import CreateProfile from "./src/Onboarding/components/CreateProfile";
import CreateDogProfile from "./src/Onboarding/components/CreateDogProfile";
import Dashboard from "./src/Dashboard/components/Dashboard";
import Community from "./src/Dashboard/components/Community";
import Learning from "./src/Dashboard/components/Learning";
import Services from "./src/Dashboard/components/Services";
import Settings from "./src/Dashboard/components/Settings";
import { firebase } from "./Firebase/firebase.js";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser.displayName);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
        <Stack.Screen name="CreateDogProfile" component={CreateDogProfile} />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          initialParams={{ user }}
        />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="Learning" component={Learning} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
