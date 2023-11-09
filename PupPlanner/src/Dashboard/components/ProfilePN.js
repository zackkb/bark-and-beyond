import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ProfilePN = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.greenBackground}>
        <View style={styles.navbarContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/cheveron-left.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.friendInfoContainer}>
        <View style={styles.imageBlock}>
          <Text style={styles.header}>Friend Info</Text>
          <Image source={require("../assets/john.png")} style={styles.photo} />
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.friendName}>John Hill</Text>
          <Text style={styles.friendInfo}>Johnny-H</Text>
          <Text style={styles.friendInfo}>212-212-2121</Text>
          <Text style={styles.friendInfo}>john.hill54@AOL.com</Text>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate("RequestHelp")}
          >
            <Text style={styles.helpText}>Request Help</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.puppyInfoContainer}>
        <View style={styles.imageBlock}>
          <Text style={styles.header}>Friend Info</Text>
          <Image
            source={require("../assets/cooper.png")}
            style={styles.friendPhoto}
          />
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.friendName}>Cooper</Text>
          <Text style={styles.friendInfo}>3 years old</Text>
          <Text style={styles.friendInfo}>54 lbs</Text>
          <Text style={styles.puppyInfo}>
            Wary of strangers and needs slow introductions. Very treat
            motivated.
          </Text>
        </View>
      </View>
      <View style={styles.activityContainer}>
        <Text style={styles.activityHeader}>Recent Activity</Text>
        <View style={styles.responseRow}>
          <View style={styles.responseContainer}>
            <View style={styles.responseMessage}>
              <Text style={styles.responseText}>
                Need dog walking in March, for 2 weeks, paid...Twice a day.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.respondButton}>
            <Text style={styles.respondButtonText}>Respond</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfilePN;

const styles = StyleSheet.create({
  greenBackground: {
    height: 98,
    backgroundColor: "#B8DFA9",
  },
  navbarContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 64,
    justifyContent: "space-between",
  },
  backButton: {
    marginLeft: 24,
  },
  editButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#323841",
    marginRight: 24,
  },
  friendInfoContainer: {
    flexDirection: "row",
    marginLeft: 16,
    marginTop: 32,
  },
  header: {
    color: "#000",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  photo: {
    height: 144,
  },
  infoBlock: {
    flex: 1,
    marginLeft: 35,
    marginTop: 20,
  },
  friendName: {
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
    marginBottom: 4,
    marginTop: 16,
  },
  friendInfo: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    marginBottom: 4,
  },
  helpButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#323841",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginRight: 43,
    width: "70%",
  },
  helpText: {
    color: "#323841",
    fontSize: 16,
    fontWeight: 600,
  },
  puppyInfoContainer: {
    flexDirection: "row",
    marginLeft: 16,
    marginTop: 32,
  },
  puppyInfo: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    marginBottom: 4,
    marginRight: 16,
  },
  activityContainer: {
    flexDirection: "column",
    marginTop: 24,
    marginLeft: 16,
  },
  activityHeader: {
    color: "#000",
    fontSize: 22,
    fontWeight: 700,
  },
  responseRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  responseContainer: {
    width: "65%",
  },
  responseMessage: {
    height: 73,
    backgroundColor: "#E9EEF6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  responseText: {
    color: "#000",
    fontSize: 16,
    fontWeight: 400,
  },
  respondButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: 700,
    marginRight: 22,
  },
});
