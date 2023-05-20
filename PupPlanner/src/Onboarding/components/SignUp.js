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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";

const isEmailValid = (value) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
};

const isPasswordValid = (value) => value.length >= 6;

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

const ErrorText = ({ error }) => <Text style={styles.error}>{error}</Text>;

const SocialButton = ({ logo, text }) => (
  <TouchableOpacity style={[styles.button, styles.socialButton]}>
    <View style={styles.buttonContent}>
      <View style={styles.logoContainer}>
        <Image
          source={logo}
          style={styles.logo}
        />
      </View>
      <Text style={styles.buttonSocialText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleEmailChange = (value) => {
    setEmail(value.trim());
    setEmailError("");
    setErrorMessage("");
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError("");
    setErrorMessage("");
  };

  const handleCreateUser = () => {
    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Please enter a password with at least 6 characters.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(() => {
        console.log("User created successfully");
        navigation.navigate("CreateProfile");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    const monitorAuthState = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
        } else {
          console.log("You're not logged in");
        }
      });
    };
    monitorAuthState();
  }, []);

  const isButtonDisabled = !isEmailValid(email) || !isPasswordValid(password);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <View style={styles.backGreen}>
        <SafeAreaView />

        <InputField
          value={email}
          onChangeText={handleEmailChange}
          label="Email"
          placeholder="Enter your email address"
        />

        {emailError && <ErrorText error={emailError} />}

        <InputField
          value={password}
          onChangeText={handlePasswordChange}
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={true}
        />

        {passwordError && <ErrorText error={passwordError} />}

        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}

        <TouchableOpacity
          style={[
            styles.continueButton,
            isButtonDisabled && styles.disabledButton,
          ]}
          onPress={handleCreateUser}
          disabled={isButtonDisabled}
        >
          <Text
            style={[
              styles.buttonText,
              isButtonDisabled && styles.disabledButtonText,
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>

        <View style={styles.lineBreak}></View>

        <SocialButton
          logo={require("../assets/gmail_logo.png")}
          text="Continue with Gmail"
        />
        <SocialButton
          logo={require("../assets/apple_logo.png")}
          text="Continue with Apple"
        />
        <SocialButton
          logo={require("../assets/facebook_logo.png")}
          text="Continue with Facebook"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  backGreen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#B8DFA9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    paddingTop: 20,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 48,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFF",
  },
  lineBreak: {
    height: 1,
    backgroundColor: "black",
    width: "90%",
    marginVertical: 20,
  },
  continueButton: {
    backgroundColor: "#323841",
    height: 48,
    width: 183,
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  disabledButtonText: {
    color: "#CCC",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialButton: {
    backgroundColor: "#FFF",
    width: "90%",
    height: 48,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 15,
    marginVertical: 10,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  logoContainer: {
    position: "absolute",
    left: 15,
  },
  buttonSocialText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  error: {
    color: "red",
    marginTop: 8,
    marginBottom: 8,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
});
