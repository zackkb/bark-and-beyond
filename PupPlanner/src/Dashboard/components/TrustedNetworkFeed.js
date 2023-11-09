import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";

const TrustedNetworkFeed = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Trusted Network Feed</Text>
        <TouchableOpacity>
          <Ionicons
            name="ios-add-circle-outline"
            size={28}
            color="black"
            style={styles.plusIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.feedCard}>
        <Image
          source={require("../assets/network_dog_1.png")}
          style={styles.feedImage}
        />
        <View style={styles.userInfoContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/john.png")}
              style={styles.userImage}
            />
            <Text style={styles.userName}>John</Text>
          </View>
          <View style={styles.feedFormContainer}>
            <Text>
              Cooper has been doing so well with his training! Celebrating with
              a puppucino!
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.feedCard}>
        <Image
          source={require("../assets/network_dog_2.png")}
          style={styles.feedImage}
        />
        <View style={styles.userInfoContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/sammy.png")}
              style={styles.userImage}
            />
            <Text style={styles.userName}>Sammy</Text>
          </View>
          <View style={styles.feedFormContainer}>
            <Text>Weekly hike with my sweet bb {"<3"}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 45,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
  },
  plusIcon: {
    marginRight: 16,
  },
  imageContainer: {
    marginRight: 10,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  feedCard: {
    marginBottom: 20,
    marginTop: 10,
  },
  feedImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  feedFormContainer: {
    flex: 1,
    marginLeft: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 14,
  },
});

export default TrustedNetworkFeed;
