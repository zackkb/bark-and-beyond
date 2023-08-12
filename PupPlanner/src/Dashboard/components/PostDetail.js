import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const PostDetail = ({ navigation }) => {
  const postContent = `Hello everyone,
I'm a concerned dog owner in search of some advice regarding my reactive dog. My furry friend, a 2-year-old Australian Shepherd, is typically friendly and outgoing when off-leash in the dog park, but becomes very reactive and anxious when on a leash, especially when he sees other dogs.

I've tried various training techniques, but they don't seem to be working. I've even enlisted the help of a professional dog trainer, but my pup still gets very agitated and reactive when we go out for walks.

I'm reaching out to the forum to see if anyone has any experience with this kind of situation and can offer some helpful tips. I'm willing to try any advice or suggestions that you may have, as I'm eager to help my dog feel more relaxed and comfortable on walks.

Thank you in advance for your help and insights!`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Chatboard")}>
          <Text style={styles.backButton}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.editText}>Edit</Text>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/remi.png")}
            style={styles.profilePic}
          />
          <Text style={styles.profileName}>Remi</Text>
        </View>
        <Text style={styles.postTitle}>Dog Reactive When Leashed</Text>
      </View>
      <Image
        source={require("../assets/demondog.png")}
        style={styles.dogImage}
      />
      <Text style={styles.postContent}>{postContent}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //padding: 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#B8DFA9",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    height: 98,
    alignSelf: "center",
  },
  backButton: {
    color: "black",
    fontSize: 24,
  },
  editText: {
    color: "black",
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginRight: 30,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  profileName: {
    fontSize: 16,
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  dogImage: {
    width: "95%",
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default PostDetail;
