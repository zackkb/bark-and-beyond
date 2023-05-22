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
  <TouchableOpacity style={styles.socialButton}>
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

const Login = () => {
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

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    if (!isEmailValid(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Please enter a password with at least 6 characters.");
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(trimmedEmail, password)
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const isButtonDisabled = !isEmailValid(email) || !isPasswordValid(password);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Log In</Text>
      <View style={styles.backGreen}>
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
          //   onPress={handleLogin}
          onPress={() => navigation.navigate("CreateProfile")}
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

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 106,
  },
  backGreen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#B8DFA9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    paddingTop: 49,
  },
  inputContainer: {
    width: "90%",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "bold",
    marginTop: 24,
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
  lineBreak: {
    height: 1,
    backgroundColor: "black",
    width: "90%",
    marginVertical: 48,
  },
  continueButton: {
    backgroundColor: "#323841",
    height: 48,
    width: "45%",
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 38,
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
    borderWidth: 1,
    borderColor: "#323841",
    width: "90%",
    height: 48,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 15,
    marginVertical: 8,
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
