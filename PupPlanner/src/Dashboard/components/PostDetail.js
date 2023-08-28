import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostDetail = ({ navigation }) => {
  const postContent = `Hello everyone,
I'm a concerned dog owner in search of some advice regarding my reactive dog. My furry friend, a 2-year-old Australian Shepherd, is typically friendly and outgoing when off-leash in the dog park, but becomes very reactive and anxious when on a leash, especially when he sees other dogs.

I've tried various training techniques, but they don't seem to be working. I've even enlisted the help of a professional dog trainer, but my pup still gets very agitated and reactive when we go out for walks.

I'm reaching out to the forum to see if anyone has any experience with this kind of situation and can offer some helpful tips. I'm willing to try any advice or suggestions that you may have, as I'm eager to help my dog feel more relaxed and comfortable on walks.

Thank you in advance for your help and insights!`;

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <View style={styles.navBarContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Chatboard")}>
            <Text style={styles.backButton}>&lt;</Text>
          </TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
        </View>
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

      <View style={styles.tagsContainer}>
        <Text style={styles.tagsLabel}>Tags:</Text>
        <View style={styles.tag}>
          <Text>Training</Text>
        </View>
        <View style={styles.tag}>
          <Text>Advice needed</Text>
        </View>
      </View>

      <View style={styles.lineBreak} />
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Comment..."
          placeholderTextColor="#aaa"
          multiline={true}
          onSubmitEditing={() => {
            console.log("Send Comment");
          }}
        />
        <TouchableOpacity
          onPress={() => {
            console.log("Send Comment");
          }}
        >
          <Ionicons name="send" style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.lineBreak} />

      <View style={styles.jennyProfileContainer}>
        <Image
          source={require("../assets/jenny.png")}
          style={styles.jennyProfilePic}
        />
        <Text style={styles.jennyProfileName}>Jenny</Text>
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>
          Hey, I totally understand your situation! I had a similar experience
          with my dog, who would become extremely reactive and scared when
          seeing other dogs while on a leash. One thing that helped me was
          working with a professional dog behaviorist who used a combination of
          positive reinforcement techniques and desensitization training. It
          takes some time and patience, but with the right approach, you can see
          progress. Best of luck to you and your furry friend!
        </Text>
      </View>
      <View style={{ paddingBottom: 20 }}></View>
      <View style={styles.lineBreak} />
      <View style={styles.jorgeProfileContainer}>
        <Image
          source={require("../assets/jorge.png")}
          style={styles.jorgeProfilePic}
        />
        <Text style={styles.jorgeProfileName}>Jorge</Text>
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>
          I found that using a front-clip harness helped a lot. It gives you
          more control over your dog's movements and can help to redirect his
          attention away from other dogs. Additionally, you could try changing
          your walking route to avoid areas where you know there will be lots of
          dogs, and gradually introduce your dog to those environments.
        </Text>
      </View>
      <View style={{ paddingBottom: 20 }}></View>
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
  commentContent: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 20,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  commentProfileContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  commentContent: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    padding: 10,
  },
  jennyProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingLeft: 15,
  },
  jennyProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  jennyProfileName: {
    fontSize: 16,
  },
  jorgeProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingLeft: 15,
  },
  jorgeProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  jorgeProfileName: {
    fontSize: 16,
  },
  commentContainer: {
    paddingLeft: 15,
  },
  commentText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  lineBreak: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FCFCFC",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: "2.5%",
    marginTop: 10,
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
    marginRight: 10,
  },
  sendIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  tagsLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  tag: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
  },
});

export default PostDetail;
