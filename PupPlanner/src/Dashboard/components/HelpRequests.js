import { StyleSheet, Text, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

const HelpRequests = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help Requests</Text>
        <Ionicons
          name="ios-add-circle-outline"
          size={28}
          color="black"
          style={styles.plusIcon}
        />
      </View>

      <View style={styles.requestContact}>
        <View style={styles.imgContainer}>
          <Image source={require("../assets/john1.png")} style={styles.user} />
          <Text style={styles.helpName}>John</Text>
        </View>

        <View style={styles.requestBody}>
          <View style={styles.textContainer}>
            <Text style={styles.requestText}>
              Need dog walking in March, for 2 weeks, paid.. Twice a day.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.requestContact}>
        <View style={styles.imgContainer}>
          <Image source={require("../assets/sammy.png")} style={styles.user} />
          <Text style={styles.helpName}>Sammy</Text>
        </View>

        <View style={styles.requestBody}>
          <View style={styles.textContainer}>
            <Text style={styles.requestText}>
              Need someone to walk my dog for an April weekend...
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HelpRequests;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  plusIcon: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
  },
  requestContact: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginLeft: 16,
  },
  helpName: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#000",
  },
  requestBody: {
    height: 73,
    width: "76%",
    marginRight: 22,
    backgroundColor: "#E9EEF6",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    marginTop: 8,
    marginLeft: 11,
    marginRight: 12,
    marginBottom: 17,
  },
  requestText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#000",
  },
  user: {
    height: 48,
    width: 48,
  },
});
