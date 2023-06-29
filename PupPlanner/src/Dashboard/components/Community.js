import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavBar from "../../NavBar";
import { Dimensions } from "react-native";

const Community = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Network");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const users = [
    { id: 1, name: "John", image: require("../assets/john.png") },
    { id: 2, name: "Sammy", image: require("../assets/sammy.png") },
    { id: 3, name: "Remi", image: require("../assets/remi.png") },
  ];

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setSelectedSection("Network")}>
          <Text
            style={
              selectedSection === "Network"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Network
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedSection("Play Date")}>
          <Text
            style={
              selectedSection === "Play Date"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Play Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedSection("Chatboard")}>
          <Text
            style={
              selectedSection === "Chatboard"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Chatboard
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <View style={styles.titleAndHelpIconContainer}>
          <Text style={styles.title}>Trusted Network</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.helpIcon}>
            <Ionicons name="ios-help-circle-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="ios-add-circle-outline"
            size={28}
            color="black"
            style={styles.plusIcon}
          />
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={toggleModal}
          >
            <Text style={styles.modalCloseButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>What's Trusted Network?</Text>
          <Text style={styles.modalContent}>
            This is your network of trusted walkers or sitters that you've
            worked with or people you know personally who use Pup Planner. Add
            them manually or from their profile!
          </Text>
        </View>
      </Modal>

      <View style={styles.usersContainer}>
        {users.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.imageContainer}>
              <Image source={user.image} style={styles.userImage} />
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textAndIconContainer}>
                <Text style={styles.userName}>{user.name}</Text>
                <TouchableOpacity>
                  <Ionicons name="ios-create-outline" size={28} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#B8DFA9",
  },
  navText: {
    color: "black",
    fontSize: 14,
    fontWeight: "400",
  },
  navTextSelected: {
    color: "black",
    fontSize: 14,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  titleAndHelpIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  helpIcon: {
    marginLeft: 5,
  },
  plusIcon: {
    marginRight: 10,
  },
  modal: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.3,
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    flexShrink: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContent: {
    marginTop: 10,
    textAlign: "center",
  },
  modalCloseButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalCloseButtonText: {
    fontSize: 20,
    color: "black",
  },
  usersContainer: {
    padding: 10,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
    backgroundColor: "transparent",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  formContainer: {
    flex: 1,
    padding: 2,
    borderRadius: 8,
  },
  textAndIconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    padding: 2,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    backgroundColor: "#E9EEF6",
  },
  userName: {
    // placeholder
  },
});

export default Community;
