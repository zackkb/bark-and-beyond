import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "../../NavBar";

const Community = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <Text>Community</Text>
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({});
