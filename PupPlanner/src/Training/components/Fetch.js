import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Video } from "expo-av";
import NavBar from "../../NavBar";

const { width, height } = Dimensions.get("window");

const Fetch = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <View style={styles.videoContainer}>
        <Video
          source={require("../assets/step1.mp4")}
          style={styles.video}
          useNativeControls
          resizeMode="cover"
          isLooping
          shouldPlay={isPlaying}
          onPlaybackStatusUpdate={(status) => setIsPlaying(status.isPlaying)}
        />
      </View>
      <TouchableOpacity
        onPress={handlePlayPause}
        style={styles.playButtonContainer}
      >
        <Text style={styles.playButtonText}>
          {isPlaying ? "Pause" : "Play"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Fetch Training Video</Text>
    </View>
  );
};

export default Fetch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    width: width,
    height: height / 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playButtonContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -50,
    marginLeft: -50,
  },
  playButtonText: {
    color: "white",
    fontSize: 30,
  },
  text: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
  },
});
