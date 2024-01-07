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

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { firebase } from "../../../Firebase/firebase";
import "firebase/storage";
import "firebase/firestore";

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
  const [image, setImage] = useState(null);
  const humanRef = firebase.firestore().collection("humanProfiles");

  const navigation = useNavigation();

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

    if (!result.cancelled) {
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
      const ref = firebase.storage().ref().child(`humanPictures/${filename}`);

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

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const addHuman = async () => {
    const imageUrl = await uploadImage();

    if (!imageUrl) {
      console.log("Failed to upload image");
      return;
    }

    const user = firebase.auth().currentUser;

    if (user) {
      const documentRef = firebase
        .firestore()
        .collection("humanProfiles")
        .doc(user.uid);
      const documentSnapshot = await documentRef.get();

      if (documentSnapshot.exists) {
        await documentRef.update({
          displayName: name,
        });
      } else {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          ownerName: name,
          phoneNumber: phone,
          createdAt: timestamp,
          imageURL: imageUrl,
          displayName: name,
        };
        await documentRef.set(data);
      }

      setName("");
      setPhone("");
      setImage(null);
    } else {
      console.log("User not found");
      return;
    }
  };

  const createAndMoveScreens = async () => {
    await addHuman();
    navigation.navigate("CreateDogProfile", { displayName: name });
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
          onPress={createAndMoveScreens}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.cancel}>Cancel</Text>
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
    fontWeight: "bold",
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
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 100,
  },
  photoButton: {
    height: 144,
    width: 144,
    marginTop: 24,
    alignContent: "center",
  },
});
