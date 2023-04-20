import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import "react-native-gesture-handler";

import Slider from "./src/Onboarding/components/Slider";

const App = () => {
  return (
    <SafeAreaView>
      <Slider />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
