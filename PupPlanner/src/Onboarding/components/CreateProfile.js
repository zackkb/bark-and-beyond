import React, { useState, useEffect, useContext } from "react";
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
<<<<<<< Updated upstream
import * as Permissions from "expo-permissions";

=======
>>>>>>> Stashed changes
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { firebase } from "../../../Firebase/firebase";
<<<<<<< Updated upstream
=======
import "firebase/storage";
import "firebase/firestore";
import { UserContext } from "../../../UserContext";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  const [uploading, setUploading] = useState(false);
=======
  const { setUser } = useContext(UserContext);
>>>>>>> Stashed changes
  const humanRef = firebase.firestore().collection("humanProfiles");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

<<<<<<< Updated upstream
  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
=======
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User signed in: ", user.displayName);
      } else {
        console.log("No user signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

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

      if (result.canceled) {
        return;
      }

      setImage(result.uri);
    } catch (error) {
      console.log("Error in pickImage function: ", error);
>>>>>>> Stashed changes
    }
  };

  const uploadImage = async () => {
<<<<<<< Updated upstream
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(`Pictures/Image1`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download URL: ", url);
          setImage(url);
          blob.close();
          return url;
        });
      }
    );
=======
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
>>>>>>> Stashed changes
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

<<<<<<< Updated upstream
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
    uploadImage();
    navigation.navigate("CreateDogProfile");
=======
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
        .collection("usersCollection")
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

      await user.updateProfile({ displayName: name });

      await user.reload();

      setUser(user);

      setName("");
      setPhone("");
      setImage(null);
    } else {
      console.log("User not found");
      return;
    }
  };

  const handleCreateProfile = async (name, imageUrl, user) => {
    try {
      setLoading(true);

      const profileData = {
        name,
        imageUrl,
      };

      await firebase
        .firestore()
        .collection("profiles")
        .doc(user.uid)
        .set(profileData);

      setLoading(false);
    } catch (error) {
      console.log("Error in handleCreateProfile function: ", error);
      setLoading(false);
    }
  };

  const createAndMoveScreens = async () => {
    try {
      const imageUrl = await uploadImage();

      if (!imageUrl) {
        console.log("Failed to upload image");
        return;
      }

      const user = firebase.auth().currentUser;

      if (user) {
        await handleCreateProfile(name, imageUrl, user);

        navigation.navigate("CreateDogProfile", { displayName: name });
      } else {
        console.log("User not found");
        return;
      }
    } catch (error) {
      console.log("Error in createAndMoveScreens function: ", error);
    }
>>>>>>> Stashed changes
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Create Profile</Text>

        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          {!image && (
            <Image
              style={styles.photoImage}
              source={require("../assets/add-photo.png")}
            />
          )}
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
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
    fontWeight: "700",
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
