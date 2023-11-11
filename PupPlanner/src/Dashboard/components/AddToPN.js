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

const AddToPN = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

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

    if (!result.canceled) {
      setImage(result.assets);
      console.log("Image has been set.");
    } else {
      console.log("something went wrong with the damn image");
    }
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleNicknameChange = (value) => {
    setNickname(value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.greenBackground}>
        <View style={styles.topButtons}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelContainer}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <View style={styles.addContainer}>
              <Text style={styles.addToNetwork}>Add to your network</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        {image ? (
          <Image
            source={{ assets: image }}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
          />
        ) : (
          <Image
            style={styles.photoButton}
            source={require("../assets/add-photo.png")}
          />
        )}
      </TouchableOpacity>

      <InputField
        value={name}
        onChangeText={handleNameChange}
        label="Friend's name"
        placeholder="Enter name"
      />

      <InputField
        value={nickname}
        onChangeText={handleNicknameChange}
        label="Nickname (optional)"
      />

      <InputField
        value={phone}
        onChangeText={handlePhoneChange}
        label="Phone number"
        placeholder="Enter 10 digit number"
      />
      <InputField
        value={email}
        onChangeText={handleEmailChange}
        label="Email"
        placeholder="john.doe@email.com"
      />

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("ProfilePN")}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default AddToPN;

const styles = StyleSheet.create({
  greenBackground: {
    backgroundColor: "#B8DFA9",
    height: 98,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 60,
  },
  cancel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#323841",
  },
  addContainer: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  addToNetwork: {
    color: "#000",
    fontSize: 16,
    fontWeight: 700,
  },
  photoButton: {
    marginTop: 30,
    marginBottom: 8,
    alignSelf: "center",
  },
  inputContainer: {
    marginLeft: 29,
    marginRight: 19,
    marginTop: 16,
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
    //display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "45%",
    height: 48,
    backgroundColor: "#323841",
    borderRadius: 30,
    marginTop: 32,
    marginBottom: 116,
  },
  continueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: 600,
  },
});
