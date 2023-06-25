import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavBar from "../../NavBar";

const Community = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Network");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setActiveTab("Network")}>
          <Text
            style={[
              styles.navText,
              activeTab === "Network" && styles.activeTabStyle,
            ]}
          >
            Network
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Play Date")}>
          <Text
            style={[
              styles.navText,
              activeTab === "Play Date" && styles.activeTabStyle,
            ]}
          >
            Play Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Chatboard")}>
          <Text
            style={[
              styles.navText,
              activeTab === "Chatboard" && styles.activeTabStyle,
            ]}
          >
            Chatboard
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        Trusted Network
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name="ios-help-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </Text>

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
    fontFamily: "Inter",
    fontWeight: "400",
  },
  activeTabStyle: {
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  modal: {
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});

export default Community;
