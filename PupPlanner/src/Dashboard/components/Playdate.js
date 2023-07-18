import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ScreenWrapper from "../../ScreenWrapper";

const Playdate = ({ navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Play Date");

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ScreenWrapper navigation={navigation}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => {
            setSelectedSection("Network");
            navigation.navigate("Community");
          }}
        >
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
        <TouchableOpacity
          onPress={() => {
            setSelectedSection("Chatboard");
            navigation.navigate("Chatboard");
          }}
        >
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
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.dogImage}
          source={require("../assets/max_dog.png")}
        />

        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.boldText}>Max, 1 year old, 50lbs</Text>
          <Text style={styles.normalText}>
            Super friendly, loves all dogs, very gentle
          </Text>
          <View style={styles.groupTextContainer}>
            <Text style={styles.normalText}>Group or 1:1 play</Text>
            {!isExpanded && <View style={styles.line} />}
          </View>

          {isExpanded && (
            <View>
              <Text style={styles.normalText}>
                {" "}
                Meet Max, a friendly and energetic Golden Retriever who loves to
                play and socialize with other dogs. Max's owner is hoping to set
                up a play date with other dog owners in the area, as Max always
                has a blast playing with his furry friends. With his wagging
                tail and playful demeanor, Max is sure to bring a smile to
                anyone's face and make new doggie friends in no time!
              </Text>
              <TouchableOpacity style={styles.messageButton}>
                <Text style={styles.buttonText}>Message</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
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
    width: "100%",
    height: 200,
    resizeMode: "contain",
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
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 10,
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
});
