import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item, index, lastIndex }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={item.img} resizeMode="contain" style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {index === lastIndex && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={[styles.buttonText, { color: "#000" }]}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
  },
  image: {
    flex: 0.5,
    width: "100%",
    marginTop: 202,
  },
  content: {
    flex: 0.4,
    width: 295,
    height: 139,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19.36,
    color: "#333",
    textAlign: "center",
    flexWrap: "wrap",
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  signupButton: {
    height: 48,
    width: 345,
    borderRadius: 30,
    padding: 12,
    backgroundColor: "#323841",
    alignItems: "center",
    justifyContent: "center",
  },

  loginButton: {
    height: 48,
    width: 345,
    borderRadius: 30,
    padding: 12,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
