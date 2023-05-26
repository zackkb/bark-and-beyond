import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const DropdownMenu = ({ navigation }) => {
  const menuItems = [
    "Dashboard",
    "Community",
    "Learning",
    "Services",
    "Settings",
    "Log out",
  ];

  return (
    <View style={styles.dropdownMenu}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item)}
        >
          <Text style={styles.menuItemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const NavBar = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={handleMenuClick}>
        <MaterialIcons name="menu" size={24} color="black" />
      </TouchableOpacity>
      {isMenuVisible && (
        <DropdownMenu navigation={navigation} style={styles.dropdownMenu} />
      )}
      <Text style={styles.navbarText}>Bark and Beyond</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <MaterialIcons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 100,
    backgroundColor: "#B8DFA9",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1,
  },
  navbarText: {
    fontSize: 20,
    color: "#000",
  },
  dropdownMenu: {
    position: "absolute",
    width: 200,
    top: 60,
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
});

export default NavBar;
