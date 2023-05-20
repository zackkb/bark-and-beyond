import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

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

const CreateDogProfile = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Create Profile</Text>

        <TouchableOpacity style={styles.photoButton}>
          <Image
            style={styles.photoImage}
            source={require("../assets/add-photo.png")}
          />
        </TouchableOpacity>

        <Text style={styles.tellUs}>Tell us about your pup</Text>

        <View style={styles.pupNameBox}>
          <Text style={styles.inputHead}>Pup's name</Text>
          <TextInput
            style={[styles.inputBox, { backgroundColor: "white" }]}
            placeholder="Enter pup's name"
            placeholderTextColor="#000"
          />
        </View>

        <TextInput
          style={[styles.subBox, { backgroundColor: "white" }]}
          placeholder="How old is your pup"
          placeholderTextColor="#000"
        />

        <TextInput
          style={[styles.subBox, { backgroundColor: "white" }]}
          placeholder="Enter weight in lbs"
          placeholderTextColor="#000"
        />

        <TextInput
          style={[styles.subBox, { backgroundColor: "white" }]}
          placeholder="Enter your pup's breed"
          placeholderTextColor="#000"
        />
        <TextInput
          style={[styles.subBox, { backgroundColor: "white" }]}
          placeholder="Enter any special needs or notes"
          placeholderTextColor="#000"
        />

        <TouchableOpacity
          style={styles.continueButton}
          // onPress={() => console.log(firebase)}
          //onPress={loginUser}
          onPress={() => navigation.navigate("CreateProfile")}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CreateProfile")}>
          <Text style={styles.goBack}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CreateDogProfile;

const styles = StyleSheet.create({
  header: {
    //  fontFamily: "poppins",
    fontSize: 50,
    fontWeight: "bold",
    lineHeight: 75,
    marginTop: 103,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
    backgroundColor: "#B8DFA9",
  },
  tellUs: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 40,
    marginRight: 180,
  },
  pupNameBox: {
    alignItems: "center",
    width: "100%",
    marginTop: 32,
  },
  inputHead: {
    fontSize: 16,
    fontWeight: "700",
  },
  inputBox: {
    fontSize: 16,
    fontWeight: "bold",
    width: "84%",
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 6,
    color: "#333",
  },
  subBox: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 0,
    gap: 6,
    width: "84%",
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 46,
    color: "#333",
  },
  continueButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: 183,
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
    marginBottom: 86,
  },
});
