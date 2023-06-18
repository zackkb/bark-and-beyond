import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, PanResponder } from "react-native";
import NavBar from "../../NavBar";
import { useNavigation } from "@react-navigation/native";

import { firebase } from "../../../Firebase/firebase";

const Dashboard = ({ route, navigation }) => {
  const [userEmail, setUserEmail] = useState("");
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
    // Fetch the dogProfile document matching the user's email
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
      } catch (error) {
        console.error("Error fetching dogProfile:", error);
      }
    };

    fetchDogProfile();
  }, [email]);

  const handleInteraction = () => {
    setTextSize(28); // Increase the text size when the user interacts
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

  if (dogProfile) {
    welcomeMessage = `Welcome Back, ${
      dogProfile.petName ? dogProfile.petName : userEmail
    }`;
  } else {
    welcomeMessage = `Welcome Back, ${userEmail}`;
  }

  return (
    <View style={styles.dashboard}>
      <NavBar navigation={navigation} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeTextContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Dashboard;
