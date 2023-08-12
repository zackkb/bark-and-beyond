import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ScreenWrapper from "../../ScreenWrapper";
import AppContext from "./AppContext";

const Post = ({ navigation, image, name, title, content, comments }) => {
  return (
    <View>
      <View style={styles.postContainer}>
        <View style={styles.profileContainer}>
          <Image source={image} style={styles.profilePic} />
          <Text style={styles.profileName}>{name}</Text>
        </View>
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{title}</Text>
          <Text style={styles.postText}>{content}</Text>
        </View>
      </View>
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsText}>{comments} Comments</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const Chatboard = ({ navigation }) => {
  const { selectedTab, setSelectedTab } = useContext(AppContext);

  useEffect(() => {
    setSelectedTab("Chatboard");
  }, []);

  return (
    <ScreenWrapper navigation={navigation} style={styles.screenWrapper}>
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
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("Play Date");
            navigation.navigate("Playdate");
          }}
        >
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
        <TouchableOpacity onPress={() => setSelectedTab("Chatboard")}>
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

      <View style={styles.header}>
        <View style={styles.newPostContainer}>
          <Icon name="add-circle-outline" size={20} color="black" />
          <Text style={styles.headerText}>New Post</Text>
        </View>
        <View style={styles.filterContainer}>
          <Icon name="filter-outline" size={20} color="black" />
          <Text style={styles.headerText}>Filter</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={() => navigation.navigate("PostDetail")}>
          <Post
            navigation={navigation}
            image={require("../assets/remi.png")}
            name="Remi"
            title="Dog Reactive When Leashed"
            content="Hello, everyone. I'm a concerned dog owner in need of some advice..."
            comments={5}
          />
        </TouchableOpacity>

        <Post
          image={require("../assets/josh.png")}
          name="Josh"
          title="Successfully house trained!!"
          content="We did it guys! Thanks to all your advice and Bark & Beyond’s training..."
          comments={10}
        />

        <Post
          image={require("../assets/joon.png")}
          name="Joon"
          title="New dog doesn't get along"
          content="My adopted puppy and older dog aren’t getting along, anyone..."
          comments={11}
        />

        <Post
          image={require("../assets/sam.png")}
          name="Sam"
          title="How to help dog decompress"
          content="So I’m fostering a very good boy but he’s obviously still tense..."
          comments={2}
        />

        <Post
          image={require("../assets/lin.png")}
          name="Lin"
          title="Appreciation post for all the b..."
          content="Seriously I am so thankful to have found a community like you..."
          comments={3}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#B8DFA9",
  },
  navText: {
    color: "black",
  },
  navTextSelected: {
    textDecorationLine: "underline",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 20,
    backgroundColor: "white",
  },
  newPostContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontWeight: "bold",
    marginLeft: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  postContainer: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#FFF",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  profileName: {
    marginTop: 5,
    textAlign: "center",
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  postText: {
    fontSize: 14,
    marginTop: 5,
  },
  commentsContainer: {
    alignItems: "flex-end",
    paddingRight: 10,
  },
  commentsText: {
    color: "black",
    fontSize: 12,
  },
  screenWrapper: {
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
  },
  separator: {
    height: 1,
    backgroundColor: "#888",
    marginVertical: 10,
  },
});

export default Chatboard;
