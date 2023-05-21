import React, { useState, useEffect, createContext, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../Firebase/firebase";
//Social Media Sign-in methods
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import appleAuth from "@invertase/react-native-apple-authentication";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import Config from "react-native-config";

// Create a context to share the user state across the application
export const UserContext = createContext(null);

// Create a provider component for the UserContext
export const UserProvider = ({ children }) => {
  // Declare user state
  const [user, setUser] = useState(null);

  // When the component mounts, start listening to auth changes in Firebase
  useEffect(() => {
    // onAuthStateChanged returns a method that unsubscribes the auth listener
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);

    // unsubscribe to the listener when unmounting
    return unsubscribe;
  }, []);

  // Use the UserContext.Provider to allow access to the user state in child components
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Function to validate email using a regular expression
const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Function to validate password length
const isPasswordValid = (password) => password.length >= 6;

// A reusable Input Field component
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

// A reusable Error Text component
const ErrorText = ({ error }) => <Text style={styles.error}>{error}</Text>;

// A reusable Social Button component
const SocialButton = ({ logo, text, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, styles.socialButton]}
  >
    <View style={styles.buttonContent}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.buttonSocialText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

// Login Component
const Login = () => {
  // Fetch user from UserContext and navigation from react-navigation
  const user = useContext(UserContext);
  const navigation = useNavigation();

  // Declare local state for email, password, and error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  // Configure Google Sign-in on mount
  useEffect(() => {
    GoogleSignin.configure({ webClientId: Config.WEB_CLIENT_ID });
  }, []);

  // When user changes, navigate to Dashboard if user is logged in
  useEffect(() => {
    if (user) {
      navigation.navigate("Dashboard");
    }
  }, [user]);

  // Function to handle change in email input
  const handleEmailChange = (email) => {
    setEmail(email.trim());
    setEmailError("");
  };

  // Function to handle change in password input
  const handlePasswordChange = (password) => {
    setPassword(password);
    setPasswordError("");
  };

  // Function to handle login attempt
  const handleLogin = async () => {
    // Validate email and password
    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!isPasswordValid(password)) {
      setPasswordError("Please enter a password with at least 6 characters.");
      return;
    }
    // Attempt to sign in with email and password
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      // Reset the error messages before setting a new one
      setEmailError("");
      setPasswordError("");
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(error.message);
          break;
        case "auth/wrong-password":
          setPasswordError(error.message);
          break;
        default:
          // If there is a different kind of error, handle it here
          // For simplicity, I'm setting it as a general error
          setError(error.message);
          break;
      }
    }
  };

  // Function to handle Google sign in
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      await firebase.auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error(error);
      setError("Google sign-in failed.");
    }
  };

  // Function to handle Apple sign in
  const handleAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw "Apple Sign-In failed - no identity token returned";
      }

      const appleCredential = new firebase.auth.OAuthProvider(
        "apple.com"
      ).credential({
        idToken: appleAuthRequestResponse.identityToken,
      });

      await firebase.auth().signInWithCredential(appleCredential);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle Facebook sign in
  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        throw "User cancelled the login process";
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining access token";
      }

      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      await firebase.auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.error(error);
    }
  };

  // A boolean to disable login button if inputs are invalid
  const isButtonDisabled = !isEmailValid(email) || !isPasswordValid(password);

  // Render the login form
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Log In</Text>
      <View style={styles.backGreen}>
        <SafeAreaView />

        <InputField
          value={email}
          onChangeText={handleEmailChange}
          label="Email"
          placeholder="Enter your email address"
        />

        {emailError && <ErrorText error={emailError} />}
        {passwordError && <ErrorText error={passwordError} />}
        {error && <ErrorText error={error} />}

        <InputField
          value={password}
          onChangeText={handlePasswordChange}
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={[
            styles.continueButton,
            isButtonDisabled && styles.disabledButton,
          ]}
          onPress={handleLogin}
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
          onPress={handleGoogleLogin}
        />
        <SocialButton
          logo={require("../assets/apple_logo.png")}
          text="Continue with Apple"
          onPress={handleAppleLogin}
        />
        <SocialButton
          logo={require("../assets/facebook_logo.png")}
          text="Continue with Facebook"
          onPress={handleFacebookLogin}
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
