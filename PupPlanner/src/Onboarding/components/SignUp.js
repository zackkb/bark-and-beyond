import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// This function checks if the input string is a valid email address
const isEmailValid = (value) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value.trim());
};

// This function checks if the input string is a valid password (at least 6 characters long)
const isPasswordValid = (value) => value.length >= 6;

// Error messages associated with email and password validation
const errorMessages = {
  isEmailValid: "Please enter a valid email address.",
  isPasswordValid: "Please enter a password with at least 6 characters.",
};

// This function validates the input and sets error and status based on the result
const validateInput = (value, validationFn, setError, setStatus) => {
  if (!validationFn(value)) {
    setError(errorMessages[validationFn.name]);
    setStatus("error");
  } else {
    setError("");
    setStatus("valid");
  }
};

// A reusable InputField component
const InputField = ({
  value,
  onChangeText,
  label,
  placeholder,
  secureTextEntry = false,
  toggleSecureEntry,
  status,
  onFocus,
  onBlur,
  errorMessage,
  active,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View
      style={[
        styles.inputWrapper,
        active ? styles.active : null,
        status === "valid"
          ? styles.valid
          : status === "error"
          ? styles.error
          : null,
      ]}
    >
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#000"
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        selectionColor="#000"
      />
      {status === "valid" && (
        <Icon
          name="check-circle-o"
          size={20}
          color="green"
        />
      )}
      {status === "error" && (
        <Icon
          name="ban"
          size={20}
          color="red"
        />
      )}
      {toggleSecureEntry && (
        <TouchableOpacity
          style={styles.icon}
          onPress={toggleSecureEntry}
        >
          <MaterialCommunityIcons
            name={secureTextEntry ? "eye-off" : "eye"}
            color="gray"
            size={20}
          />
        </TouchableOpacity>
      )}
      {status === "error" && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
    {status === "error" && <Text style={styles.error}>{errorMessage}</Text>}
  </View>
);

// Component for rendering error text
const ErrorText = ({ error }) => <Text style={styles.error}>{error}</Text>;

// Component for rendering social buttons
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

// The main SignUp component
const SignUp = () => {
  // State variables defined using useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // Event handlers
  const handleEmailChange = (value) => {
    setEmail(value);
    if (!emailFocus) {
      validateInput(value, isEmailValid, setEmailError, setEmailStatus);
    }
  };

  const handleEmailBlur = () => {
    setEmailFocus(false);

    // Trim the email input when the user finishes typing
    const trimmedEmail = email.trim();
    setEmail(trimmedEmail);

    validateInput(trimmedEmail, isEmailValid, setEmailError, setEmailStatus);
  };

  const handleEmailFocus = () => {
    setEmailFocus(true);
    setEmailStatus("");
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (!passwordFocus) {
      validateInput(
        value,
        isPasswordValid,
        setPasswordError,
        setPasswordStatus
      );
    }
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(false);
    validateInput(
      password,
      isPasswordValid,
      setPasswordError,
      setPasswordStatus
    );
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
    setPasswordStatus("");
  };

  // Function to handle user creation in Firebase
  const handleCreateUser = async () => {
    setLoading(true);

    // Validate input before creating user
    if (!isEmailValid(email) || !isPasswordValid(password)) {
      setLoading(false);
      return;
    }

    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password);
      const user = userCredential.user;

      // Obtain the user ID
      const userId = user.uid;

      // Create a Firestore reference to the "users" collection
      const db = firebase.firestore();
      const usersCollection = db.collection("users");

      // Store the user's email and password in the collection
      await usersCollection.doc(userId).set({
        email: email,
        password: password,
      });

      setLoading(false);
      navigation.navigate("CreateProfile");
    } catch (error) {
      setLoading(false);
      // Handle the error
      console.error(error);
    }
  };

  // Function to monitor the user's authentication state
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

  // Disable button if email or password is invalid
  const isButtonDisabled = !isEmailValid(email) || !isPasswordValid(password);

  // The render function
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
      ) : (
        <View style={styles.backGreen}>
          <InputField
            label="Email"
            placeholder="Enter your email address"
            value={email}
            onChangeText={handleEmailChange}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            status={emailFocus ? "" : emailStatus}
            active={emailFocus}
          />
          {emailError && <ErrorText error={emailError} />}
          <InputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={secureEntry}
            toggleSecureEntry={() => setSecureEntry(!secureEntry)}
            value={password}
            onChangeText={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            status={passwordFocus ? "" : passwordStatus}
            active={passwordFocus}
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
      )}
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFF",
    position: "relative",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "bold",
    marginTop: 24,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 10,
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
  errorMessage: {
    position: "absolute",
    color: "red",
    fontSize: 12,
    bottom: -20,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  valid: {
    borderColor: "green",
  },
  error: {
    borderColor: "red",
  },
  active: {
    borderColor: "#88C6E7",
  },
});
