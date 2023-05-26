import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NavBar from "../../NavBar";

const Dashboard = ({ user, navigation }) => {
  return (
    <View style={styles.dashboard}>
      <NavBar navigation={navigation} />
      <Text style={styles.welcomeText}>Welcome back</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 24,
    margin: 20,
  },
});

export default Dashboard;
