import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import ScreenWrapper from "../../ScreenWrapper";
import Icon from "react-native-vector-icons/FontAwesome";
import AppContext from "./AppContext";

const Playdate = ({ navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedTab, setSelectedTab } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setSelectedTab("Play Date");
  }, []);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const deviceWidth = Dimensions.get("window").width;

  return (
    <ScreenWrapper navigation={navigation}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("Network");
            navigation.navigate("Community");
          }}
        >
          <Text
            style={
              selectedTab === "Network"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Network
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("Play Date")}>
          <Text
            style={
              selectedTab === "Play Date"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Play Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("Chatboard");
            navigation.navigate("Chatboard");
          }}
        >
          <Text
            style={
              selectedTab === "Chatboard"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Chatboard
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.dogImage}
            source={require("../assets/max_dog.png")}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => {}}>
            <Icon name="times-circle" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Icon name="heart" size={30} color={isLiked ? "red" : "white"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.boldText}>Max, 1 year old, 50lbs</Text>
          <Text style={styles.normalText}>
            Super friendly, loves all dogs, very gentle
          </Text>
          <View style={styles.groupTextContainer}>
            <Text style={styles.normalText}>Group or 1:1 play</Text>
            {!isExpanded && <Icon name="chevron-down" size={16} />}
            {isExpanded && <Icon name="chevron-up" size={16} />}
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View>
            <Text style={styles.expandedText}>
              Meet Max, a friendly and energetic Golden Retriever who loves to
              play and socialize with other dogs. Max's owner is hoping to set
              up a play date with other dog owners in the area, as Max always
              has a blast playing with his furry friends. With his wagging tail
              and playful demeanor, Max is sure to bring a smile to anyone's
              face and make new doggie friends in no time!
            </Text>
          </View>
        )}

        <View style={styles.separator} />

        <View style={styles.localContainer}>
          <Text style={styles.title}>Local to you</Text>
          <View style={styles.userCard}>
            <View style={styles.profileContainer}>
              <Image
                source={require("../assets/snoopy.png")}
                style={styles.userImage}
              />
              <Text style={styles.userName}>Snoopy</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textAndIconContainer}>
                <Text style={styles.userInfoBold}>2 years old, 25lbs</Text>
                <Text style={styles.userInfo}>Group Play</Text>
              </View>
            </View>
          </View>
          {/* New profile for 'Ruff' */}
          <View style={styles.userCard}>
            <View style={styles.profileContainer}>
              <Image
                source={require("../assets/ruff.png")}
                style={styles.userImage}
              />
              <Text style={styles.userName}>Ruff</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textAndIconContainer}>
                <Text style={styles.userInfoBold}>3 years old</Text>
                <Text style={styles.userInfo}>1:1 Play</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Playdate;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#B8DFA9",
  },
  dogImage: {
    width: "90%",
    aspectRatio: 361 / 240,
    resizeMode: "cover",
    borderRadius: 8,
    flexShrink: 0,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
  normalText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  groupTextContainer: {
    alignItems: "center",
  },
  messageButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "45%",
    padding: 12,
    borderRadius: 30,
    backgroundColor: "#323841",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    bottom: "50%",
    left: 20,
    padding: 10,
    transform: [{ translateY: 15 }],
  },
  heartButton: {
    position: "absolute",
    bottom: "50%",
    right: 20,
    padding: 10,
    transform: [{ translateY: 15 }],
  },
  titleContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    marginBottom: 10,
  },
  profileContainer: {
    marginRight: 10,
    alignItems: "flex-start",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    textAlign: "left",
  },
  formContainer: {
    width: "84%",
    height: 73,
    flexShrink: 0,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E9EEF6",
  },
  userInfo: {
    fontSize: 16,
  },
  userInfoBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textAndIconContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  navTextSelected: {
    textDecorationLine: "underline",
  },
});
