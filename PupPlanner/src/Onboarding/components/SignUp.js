import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../../../Firebase/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function emailChange(value) {
    setEmail(value);
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function passwordChange(value) {
    setPassword(value);
    if (value.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
    } else {
      setErrorMessage("");
    }
  }

  function createUser() {
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
    } else if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {})
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <TextInput
        onChangeText={emailChange}
        value={email}
        style={styles.email}
        placeholder="Enter your email address"
        placeholderTextColor="#000"
      />
      <TextInput
        onChangeText={passwordChange}
        value={password}
        style={styles.password}
        placeholder="Enter your password"
        placeholderTextColor="#000"
        secureTextEntry={true}
      />
      {errorMessage !== "" && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      <View style={styles.lineBreak}></View>

      <TouchableOpacity
        style={styles.continueButton}
        //onPress={() => console.log(firebase)}
        onPress={createUser}
        //onPress={() => console.log(email, password)}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.gmailButton}>
        <Text style={styles.externalText}>Continue with Gmail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.appleButton}>
        <Text style={styles.externalText}>Continue with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.facebookButton}>
        <Text style={styles.externalText}>Continue with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  header: {
    //  fontFamily: "poppins",
    fontSize: 50,
    fontWeight: 700,
    lineHeight: 75,
    marginTop: 106,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    // backgroundColor: "#B8DFA9",
  },
  email: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    padding: 0,
    gap: 6,
    position: "absolute",
    width: 345,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 252,
    paddingLeft: 15,
    color: "#333",
  },
  password: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    padding: 0,
    gap: 6,
    position: "absolute",
    width: 345,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 364,
    paddingLeft: 15,
    color: "#333",
  },
  lineBreak: {
    position: "absolute",
    width: 327,
    height: 0,
    borderWidth: 1,
    borderColor: "black",
    left: 41,
    top: 550,
  },
  continueButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    position: "absolute",
    width: 183,
    height: 48,
    top: 480,
    backgroundColor: "#323841",
    borderRadius: 30,
  },
  continueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  gmailButton: {
    position: "absolute",
    width: 345,
    height: 48,
    top: 624,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 30,
  },
  appleButton: {
    position: "absolute",
    width: 345,
    height: 48,
    top: 688,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 30,
  },
  facebookButton: {
    position: "absolute",
    width: 345,
    height: 48,
    top: 752,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 30,
  },
  externalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
