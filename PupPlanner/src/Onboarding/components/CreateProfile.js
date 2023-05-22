import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { firebase } from "../../../Firebase/firebase";

const InputField = ({
  value,
  onChangeText,
  label,
  placeholder,
  secureTextEntry = false,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      onChangeText={onChangeText}
      value={value}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#000"
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const humanRef = firebase.firestore().collection("humanProfiles");

  const navigation = useNavigation();

  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  //add human to humanProfiles collection
  const addHuman = () => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      ownerName: name,
      phoneNumber: phone,
      createdAt: timestamp,
    };
    humanRef
      .add(data)
      .then(() => {
        setName("");
        setPhone("");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const createAndMoveScreens = () => {
    addHuman();
    navigation.navigate("CreateDogProfile");
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Create Profile</Text>
        <TouchableOpacity style={styles.photoButton}>
          <Image
            style={styles.photoImage}
            source={require("../assets/add-photo.png")}
          />
        </TouchableOpacity>

        <Text style={styles.contact}>How can we contact you?</Text>

        <InputField
          value={name}
          onChangeText={handleNameChange}
          label="Your name"
          placeholder="Enter your full name"
        />
        <InputField
          value={phone}
          onChangeText={handlePhoneChange}
          label="Phone number"
          placeholder="Enter your phone number"
        />

        <TouchableOpacity
          style={styles.continueButton}
          // onPress={() => console.log(firebase)}
          // onPress={() => navigation.navigate("CreateDogProfile")}
          //  onPress={addName}
          onPress={createAndMoveScreens}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.goBack}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#B8DFA9",
  },
  header: {
    //  fontFamily: "poppins",
    fontSize: 50,
    fontWeight: "bold",
    lineHeight: 75,
    marginTop: 103,
    textAlign: "center",
  },
  contact: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 40,
    marginBottom: 16,
    marginRight: 190,
  },
  inputContainer: {
    width: "90%",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 16,
    fontWeight: "bold",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  continueButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: 48,
    backgroundColor: "#323841",
    borderRadius: 30,
    marginTop: 48,
  },
  continueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancel: {
    fontSize: 16,
  },
  photoButton: {
    height: 144,
    width: 144,
    marginTop: 24,
  },
  goBack: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 24,
    marginBottom: 70,
  },
});
