import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, PanResponder, ScrollView } from "react-native";
import Calendar from "./Calendar";
import Navigation from "./Navigation";
import Notifications from "./Notifications";
import ScreenWrapper from "../../ScreenWrapper";
import HelpRequests from "./HelpRequests";
import TrustedNetworkFeed from "./TrustedNetworkFeed";

import { useNavigation } from "@react-navigation/native";

import { firebase } from "../../../Firebase/firebase";

const Dashboard = ({ route, navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const { email } = route.params;
  let welcomeMessage = "";

  const [dogProfile, setDogProfile] = useState(null);
  const [textSize, setTextSize] = useState(24);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const user = firebase.auth().currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  useEffect(() => {
    const fetchDogProfile = async () => {
      try {
        const docSnapshot = await firebase
          .firestore()
          .collection("dogProfiles")
          .doc(email)
          .get();
        if (docSnapshot.exists) {
          const dogProfileData = docSnapshot.data();
          setDogProfile(dogProfileData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dogProfile:", error);
        setLoading(false);
      }
    };

    fetchDogProfile();
  }, [email]);

  const handleInteraction = () => {
    setTextSize(28);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      if (dx > 0 || dy > 0) {
        setIsSliding(true);
      } else {
        setIsSliding(false);
      }
    },
    onPanResponderRelease: () => {
      setIsSliding(false);
    },
  });

  if (loading) {
    return (
      <View style={styles.dashboard}>
        <Text style={styles.welcomeText}>Loading...</Text>
      </View>
    );
  }

  if (dogProfile) {
    welcomeMessage = `Welcome back, \n${
      dogProfile.petName ? dogProfile.petName : userEmail
    }`;
  } else {
    welcomeMessage = `Welcome back, \n${userEmail}`;
  }

  return (
    <ScreenWrapper navigation={navigation}>
      <ScrollView style={styles.dashboard}>
        <View
          style={[
            styles.welcomeTextContainer,
            {
              backgroundColor: isSliding ? "lightgray" : "transparent",
              shadowColor: "#000",
              shadowOffset: {
                width: 3,
                height: 3,
              },
              shadowOpacity: 0.5,
              shadowRadius: 5,
            },
          ]}
          {...panResponder.panHandlers}
          onPress={handleInteraction}
        >
          <Text style={styles.welcomeText}>{welcomeMessage}</Text>
        </View>
        <Calendar />
        <Notifications />
        <Navigation />
        <HelpRequests />
        <TrustedNetworkFeed />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 38,
    fontWeight: "bold",
    height: 114,
    marginTop: 32,
    textAlign: "center",
  },
});

export default Dashboard;
