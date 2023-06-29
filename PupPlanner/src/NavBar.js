import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const DropdownMenu = ({ navigation, closeMenu }) => {
  const menuItems = [
    "Dashboard",
    "Community",
    "Learning",
    "Services",
    "Settings",
    "Log out",
  ];

  const [highlightedItem, setHighlightedItem] = useState(null);

  const handlePressIn = (index) => {
    setHighlightedItem(index);
  };

  const handlePressOut = () => {
    setHighlightedItem(null);
  };

  const handleItemPress = (item) => {
    navigation.navigate(item);
    closeMenu(); // close the menu when an item is clicked
  };

  return (
    <View style={styles.dropdownMenu}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuItem,
            index === highlightedItem && styles.highlightedItem,
          ]}
          onPress={() => handleItemPress(item)}
          onPressIn={() => handlePressIn(index)}
          onPressOut={handlePressOut}
        >
          <Text
            style={[
              styles.menuItemText,
              index === highlightedItem && styles.highlightedItemText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const NavBar = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      setIsMenuVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  const handleDogIconClick = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleMenuClick}>
          <MaterialIcons
            name="menu"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        {isMenuVisible && (
          <DropdownMenu
            navigation={navigation}
            closeMenu={closeMenu}
          />
        )}
        <TouchableOpacity onPress={handleDogIconClick}>
          <Image source={require("../assets/gray_logo.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MaterialIcons
            name="search"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 129,
    backgroundColor: "#B8DFA9",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 15,
    justifyContent: "space-between",
    zIndex: 1,
  },
  dropdownMenu: {
    position: "absolute",
    width: 200,
    top: 80, // Adjust the top value to move the dropdown menu down
    left: 10,
    backgroundColor: "#B8DFA9",
    borderRadius: 12,
    padding: 10,
    elevation: 4,
  },
  menuItem: {
    padding: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: "#000",
  },
  highlightedItem: {
    transform: [{ scale: 1.1 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  highlightedItemText: {
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
  },
});

export default NavBar;
