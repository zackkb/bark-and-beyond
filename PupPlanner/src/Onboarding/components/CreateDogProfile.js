import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

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

const CreateDogProfile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [breed, setBreed] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const dogRef = firebase.firestore().collection("dogProfiles");

  const navigation = useNavigation();

  const [userDogProfiles, setUserDogProfiles] = useState([]);

  useEffect(() => {
    const fetchUserDogProfiles = async () => {
      const email = firebase.auth().currentUser.uid;
      const snapshot = await dogRef.where("email", "==", email).get();
      const profiles = snapshot.docs.map((doc) => doc.data());
      setUserDogProfiles(profiles);
    };

    fetchUserDogProfiles();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      if (!image) return null;

      const response = await fetch(image);

      const blob = await response.blob();

      const timestamp = Date.now();
      const filename = `Image${timestamp};`;
      const ref = firebase.storage().ref().child(`dogPictures/${filename}`);

      const snapshot = await ref.put(blob);

      const downloadUrl = await snapshot.ref.getDownloadURL();

      return downloadUrl;
    } catch (error) {
      console.log("Error in uploadImage function: ", error);
      throw error;
    }
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleAgeChange = (value) => {
    setAge(value);
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const handleBreedChange = (value) => {
    setBreed(value);
  };

  const handleNotesChange = (value) => {
    setNotes(value);
  };

  //add human to dogProfiles collection
  const addDog = async () => {
    const imageUrl = await uploadImage();

    if (!imageUrl) {
      console.log("Failed to upload image");
      return;
    }

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const email = firebase.auth().currentUser.email;

    // Set the document ID as the user's email
    const docRef = dogRef.doc(email);

    const data = {
      petName: name,
      petAge: age,
      weight: weight,
      breed: breed,
      specialNotes: notes,
      createdAt: timestamp,
      imageURL: imageUrl,
    };

    docRef
      .set(data)
      .then(() => {
        setName("");
        setAge("");
        setWeight("");
        setBreed("");
        setNotes("");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const createAndMoveToDashboard = async () => {
    await addDog();

    const email = firebase.auth().currentUser.email;
    const docSnapshot = await dogRef.doc(email).get();
    const dogProfileData = docSnapshot.data();
    const petName = dogProfileData ? dogProfileData.petName : "";

    navigation.navigate("Dashboard", {
      email: email,
      petName: petName,
    });
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Create Profile</Text>

        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
            />
          ) : (
            <Image
              style={styles.photoImage}
              source={require("../assets/add-photo.png")}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.tellUs}>Tell us about your pup</Text>

        <InputField
          value={name}
          onChangeText={handleNameChange}
          label="Pup's name"
          placeholder="Enter pup's name"
        />
        <InputField
          value={age}
          onChangeText={handleAgeChange}
          label="Pup's age"
          placeholder="How old is your pup"
        />
        <InputField
          value={weight}
          onChangeText={handleWeightChange}
          label="Pup's weight"
          placeholder="Enter weight in lbs"
        />
        <InputField
          value={breed}
          onChangeText={handleBreedChange}
          label="Breed"
          placeholder="Enter your pup's breed"
        />
        <InputField
          value={notes}
          onChangeText={handleNotesChange}
          label="Notes for pup"
          placeholder="Enter any special needs or notes"
        />

        <TouchableOpacity
          style={styles.continueButton}
          onPress={createAndMoveToDashboard}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CreateProfile")}>
          <Text style={styles.goBack}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CreateDogProfile;

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
  tellUs: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 40,
    marginBottom: 16,
    marginRight: 215,
  },
  inputContainer: {
    width: "90%",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 16,
    fontWeight: "bold",
  },
  input: {
    height: 48,
    borderColor: "#333",
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
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 24,
    marginBottom: 86,
  },
});
