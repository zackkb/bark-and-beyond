import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScreenWrapper from "../../ScreenWrapper";

const Community = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isHelpRequestModalVisible, setHelpRequestModalVisible] =
    useState(false);
  const [selectedSection, setSelectedSection] = useState("Network");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleHelpRequestModal = () => {
    setHelpRequestModalVisible(!isHelpRequestModalVisible);
  };

  const users = [
    {
      id: 1,
      name: "John",
      image: require("../assets/john.png"),
      helpRequest: "Need dog walking in March for 2 weeks, paid.. Twice a day.",
    },
    {
      id: 2,
      name: "Sammy",
      image: require("../assets/sammy.png"),
      helpRequest: "Need someone to walk my dog for an April weekend...",
    },
    { id: 3, name: "Remi", image: require("../assets/remi.png") },
  ];

  return (
    <ScreenWrapper navigation={navigation}>
      <ScrollView style={styles.container}>
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
          <TouchableOpacity
            onPress={() => {
              setSelectedSection("Play Date");
              navigation.navigate("Playdate");
            }}
          >
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
              <Ionicons
                name="ios-help-circle-outline"
                size={28}
                color="black"
              />
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
                    <Ionicons
                      name="ios-create-outline"
                      size={28}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.titleAndHelpIconContainer}>
            <Text style={styles.title}>Help Requests</Text>
            <TouchableOpacity
              onPress={toggleHelpRequestModal}
              style={styles.helpIcon}
            >
              <Ionicons
                name="ios-help-circle-outline"
                size={28}
                color="black"
              />
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

        <Modal
          isVisible={isHelpRequestModalVisible}
          onBackdropPress={toggleHelpRequestModal}
        >
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleHelpRequestModal}
            >
              <Text style={styles.modalCloseButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>What's a Help Request?</Text>
            <Text style={styles.modalContent}>
              These are requests posted by your trusted network! You can post
              your own or lend a helping hand!
            </Text>
          </View>
        </Modal>

        <View style={styles.usersContainer}>
          {users.map(
            (user) =>
              user.helpRequest && (
                <View key={user.id} style={styles.userCard}>
                  <View style={styles.imageContainer}>
                    <Image source={user.image} style={styles.userImage} />
                    <Text style={styles.userName}>{user.name}</Text>
                  </View>
                  <View style={styles.formContainer}>
                    <View style={styles.textAndIconContainer}>
                      <Text style={styles.userName}>{user.helpRequest}</Text>
                    </View>
                  </View>
                </View>
              )
          )}
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Trusted Network Feed</Text>
          <TouchableOpacity>
            <Ionicons
              name="ios-add-circle-outline"
              size={28}
              color="black"
              style={styles.plusIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.feedCard}>
          <Image
            source={require("../assets/network_dog_1.png")}
            style={styles.feedImage}
          />
          <View style={styles.userInfoContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/john.png")}
                style={styles.userImage}
              />
              <Text style={styles.userName}>John</Text>
            </View>
            <View style={styles.feedFormContainer}>
              <Text>
                Cooper has been doing so well with his training! Celebrating
                with a puppucino!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.feedCard}>
          <Image
            source={require("../assets/network_dog_2.png")}
            style={styles.feedImage}
          />
          <View style={styles.userInfoContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/sammy.png")}
                style={styles.userImage}
              />
              <Text style={styles.userName}>Sammy</Text>
            </View>
            <View style={styles.feedFormContainer}>
              <Text>Weekly hike with my sweet bb {"<3"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
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
    alignItems: "center",
  },
  feedCard: {
    marginBottom: 20,
    marginTop: 10,
  },
  feedImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  feedFormContainer: {
    flex: 1,
    marginLeft: 10,
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
    fontSize: 14,
  },
});

export default Community;
