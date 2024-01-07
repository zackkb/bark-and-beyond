import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ScreenWrapper from "../../ScreenWrapper";
import Icon from "react-native-vector-icons/Ionicons";

const Comment = ({ image, name, content }) => {
  return (
    <View style={styles.commentContainer}>
      <Image source={image} style={styles.commentProfilePic} />
      <View style={styles.commentTextContainer}>
        <Text style={styles.commentName}>{name}</Text>
        <Text style={styles.commentText}>{content}</Text>
      </View>
    </View>
  );
};

const Learning = ({ navigation }) => {
  const [showDetailedText, setShowDetailedText] = useState(false);
  const [comment, setComment] = useState("");

  const handleMoreClick = () => {
    setShowDetailedText(true);
  };

  const handleBackClick = () => {
    setShowDetailedText(false);
  };

  return (
    <ScreenWrapper navigation={navigation}>
      {showDetailedText ? (
        <ScrollView contentContainerStyle={styles.detailedTextContainer}>
          <TouchableOpacity onPress={handleBackClick}>
            <Text style={styles.backIcon}>{"<"}</Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/doggypaws.png")}
            style={styles.pawsImage}
          />
          <Text style={styles.headingText}>Kibble or Wet Food?</Text>
          <Text style={styles.normalText}>
            The choice between wet or dry dog food is largely a matter of
            personal preference and your dog's individual needs. Both types of
            food have their benefits and drawbacks. Wet dog food, also known as
            canned dog food, is high in moisture content and can be a good
            option for dogs who need to stay hydrated. It's also a good choice
            for dogs who have dental problems and find it difficult to chew dry
            food. Wet food has a higher concentration of protein and is often
            more palatable to dogs, which can be helpful for picky eaters. On
            the downside, wet food is more perishable than dry food and needs to
            be refrigerated after opening. It's also more expensive per serving
            than dry food. Dry dog food, also known as kibble, is a more
            convenient and longer-lasting option. It's easy to store and can be
            left out for your dog to eat as needed. Dry food is also more
            cost-effective than wet food. However, it's lower in moisture
            content, which can be an issue for dogs who need to stay hydrated,
            and it may not be as appealing to some dogs. Additionally, some dry
            foods are high in carbohydrates, which can contribute to weight
            gain. Ultimately, the best choice of food for your dog will depend
            on their individual health needs, dietary requirements, and personal
            preferences. It's always a good idea to consult with a veterinarian
            to determine the best diet for your furry friend.
          </Text>

          <View style={styles.separator} />

          <View style={styles.commentsHeaderContainer}>
            <Text style={styles.commentsHeader}>Comments</Text>
            <View style={styles.commentCountBox}>
              <Text style={styles.commentCount}>2</Text>
            </View>
          </View>

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Comment..."
              placeholderTextColor="gray"
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.sendIconContainer}>
              <Icon name="send" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.commentSeparator} />

          <Comment
            image={require("../assets/jenny.png")}
            name="Jenny"
            content="Wow, so I feed my dog dry kibble. Maybe I should start feeding her some wet food too!"
          />

          <View style={styles.commentSeparator} />

          <Comment
            image={require("../assets/jorge.png")}
            name="Jorge"
            content="My dog is older so he gets lots of wet food! Helps with his hydration too!"
          />
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <View style={styles.box}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/balls.png")}
                  style={styles.image}
                />
                <Image
                  source={require("../assets/treats.png")}
                  style={[styles.image, styles.treatsImage]}
                />
              </View>
              <Text style={styles.boxText}>Shop</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Training")}
              style={styles.box}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/smalldog.png")}
                  style={[styles.image, styles.dogImage]}
                />
              </View>
              <Text style={styles.boxText}>Training</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../assets/doggypaws.png")}
            style={styles.pawsImage}
          />
          <Text style={styles.headingText}>Kibble or Wet Food?</Text>
          <Text style={styles.normalText}>
            The choice between wet or dry dog food is largely a matter of
            personal preference and your dog's individual needs. Both types of
            food have their benefits and drawbacks.
          </Text>
          <TouchableOpacity onPress={handleMoreClick}>
            <Text style={styles.linkText}>More</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <View style={styles.pottyProblemsContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headingText}>Potty Problems</Text>
              <Text style={styles.normalText}>
                Has your dog been having bathroom breaks on your carpet? Well
                here are some factors that may be causing your dog to go where
                they aren’t supposed to.
              </Text>
            </View>
            <Image
              source={require("../assets/peedog.png")}
              style={styles.peedogImage}
            />
            <TouchableOpacity
              style={styles.moreIconContainer}
              onPress={() => navigation.navigate("MoreInfo")}
            >
              <Text style={styles.moreIconText}>{">"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.doggyDaycareContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headingText}>Doggy Daycare</Text>
              <Text style={styles.normalText}>
                Doggy daycare is a great option if you work a full-time job and
                aren’t home all the time. It's beneficial to socialize your dog
                more and allow them to get exercise during the day.
              </Text>
            </View>
            <Image
              source={require("../assets/doggydaycare.png")}
              style={styles.doggyDaycareImage}
            />
            <TouchableOpacity
              style={styles.moreIconContainer}
              onPress={() => navigation.navigate("MoreInfo")}
            >
              <Text style={styles.moreIconText}>{">"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default Learning;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  box: {
    width: 172,
    height: 105,
    backgroundColor: "#88C6E7",
    borderRadius: 8,
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 5,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    marginHorizontal: 3,
    marginTop: 10,
  },
  treatsImage: {
    marginLeft: -3,
    marginTop: 15,
  },
  boxText: {
    color: "#FCFCFC",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pawsImage: {
    marginTop: 10,
    alignSelf: "center",
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "left",
  },
  normalText: {
    fontSize: 16,
    textAlign: "left",
  },
  linkText: {
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "right",
    marginRight: 20,
  },
  separator: {
    width: 361.05,
    height: 3,
    backgroundColor: "#D4874E",
    alignSelf: "center",
    marginTop: 20,
  },
  commentSeparator: {
    height: 1,
    backgroundColor: "#888",
    marginVertical: 10,
  },
  pottyProblemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    flexWrap: "wrap",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  peedogImage: {
    position: "relative",
  },
  moreIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  moreIconText: {
    fontSize: 24,
  },
  doggyDaycareContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    flexWrap: "wrap",
  },
  doggyDaycareImage: {
    position: "relative",
  },
  detailedTextContainer: {
    padding: 20,
    flexGrow: 1,
  },
  backIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  commentsHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentsHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
  },
  commentCountBox: {
    backgroundColor: "#FFF",
    width: 24,
    height: 24,
    flexShrink: 0,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 10,
  },
  commentCount: {
    color: "#4A7790",
    fontSize: 12,
    fontWeight: "bold",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  sendIconContainer: {
    marginLeft: 10,
  },
  commentContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  commentProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentName: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    marginTop: 5,
  },
});
