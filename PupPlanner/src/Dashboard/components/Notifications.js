import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.topHeader}>Notifications</Text>

      <View style={styles.notifyHelp}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/bell.png")}
            style={styles.notifyIcon}
          />
        </View>
        <View style={styles.notifyContent}>
          <Text style={styles.notifyHeader}>Help Request</Text>
          <Text style={styles.notifyText}>March 30th</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Image
            style={styles.arrow}
            source={require("../assets/largeArrowRight.png")}
          />
        </View>
      </View>

      <View style={styles.notifyHelp}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/clipboard.png")}
            style={styles.notifyIcon}
          />
        </View>
        <View style={styles.notifyContent}>
          <Text style={styles.notifyHeader}>Check-up due</Text>
          <Text style={styles.notifyText}>Due March 31st</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Image
            style={styles.arrow}
            source={require("../assets/largeArrowRight.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  topHeader: {
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: 15,
  },
  notifyHelp: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    marginTop: 20,
    backgroundColor: "#E9EEF6",
  },
  notifyContent: {
    flex: 1,
    marginLeft: 12,
    height: 70,
    justifyContent: "center",
  },
  notifyHeader: {
    fontWeight: "semibold",
    fontSize: 16,
  },
  notifyText: {
    fontSize: 12,
    color: "#000",
  },
  arrowContainer: {
    alignItems: "flex-end",
    marginRight: 16,
  },
  iconContainer: {
    backgroundColor: "#fff",
    height: 48,
    width: "12.5%",
    borderRadius: 15,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    elevation: 6,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowColor: "#000",
  },
});
