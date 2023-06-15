import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import NavBar from "../../NavBar";
import { UserContext } from "../../../UserContext";

const Dashboard = ({ navigation, route }) => {
  const user = useContext(UserContext);

  const displayName = route.params?.displayName;
  let welcomeMessage = `Welcome Back, ${displayName ? displayName : "Guest"}`;

  return (
    <View style={styles.dashboard}>
      <NavBar navigation={navigation} />

      <Text style={styles.welcomeText}>{welcomeMessage}</Text>
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
