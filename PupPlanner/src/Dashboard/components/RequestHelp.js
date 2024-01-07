import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const dropdownOptions = ["Trusted Network", "All users"];

const CustomDropdown = ({
  label,
  selectedOption,
  onToggleDropdown,
  options,
  isVisible,
  onSelectOption,
}) => {
  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.dropdownField}>
        <Text style={styles.dropdownText}>
          {selectedOption || "Select an option"}
        </Text>
        <TouchableOpacity onPress={onToggleDropdown}>
          <Image
            source={require("../assets/cheveron-down.png")}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>
      </View>
      {isVisible && (
        <FlatList
          data={options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => onSelectOption(item)}
            >
              <Text style={styles.dropdownOptionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const InputField = ({
  value,
  onChangeText,
  label,
  placeholder,
  secureTextEntry = false,
  iconSource,
  onIconPress,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputField}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#000"
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity onPress={onIconPress}>
        <Image source={iconSource} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

const RequestHelp = () => {
  const [help, setHelp] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [pay, setPay] = useState("");
  const [request, setRequest] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const navigation = useNavigation();

  const handleHelpChange = (value) => {
    setHelp(value);
  };

  const handleDayChange = (value) => {
    setDay(value);
  };

  const handleTimeChange = (value) => {
    setTime(value);
  };

  const handlePayChange = (value) => {
    setPay(value);
  };

  const handleRequestChange = (value) => {
    setRequest(value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.greenBackground}>
        <View style={styles.topButtons}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/cheveron-left.png")}
                style={styles.backButton}
              />
            </TouchableOpacity>

            <View style={styles.addContainer}>
              <Text style={styles.addToNetwork}>Request help</Text>
            </View>
          </View>
        </View>
      </View>

      <InputField
        value={help}
        onChangeText={handleHelpChange}
        label="What do you need help with?"
      />

      <InputField
        value={day}
        onChangeText={handleDayChange}
        label="What day(s)?"
        iconSource={require("../assets/calendar.png")}
      />

      <InputField
        value={time}
        onChangeText={handleTimeChange}
        label="What time(s)?"
      />

      <InputField
        value={pay}
        onChangeText={handlePayChange}
        label="How much will you be paying (optional)"
        placeholder="$"
      />

      <CustomDropdown
        label="Who do you want to see your request?"
        selectedOption={selectedOption}
        onToggleDropdown={toggleDropdown}
        options={dropdownOptions}
        isVisible={isDropdownOpen}
        onSelectOption={handleOptionSelect}
      />

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("ProfilePN")}
      >
        <Text style={styles.continueText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  greenBackground: {
    backgroundColor: "#B8DFA9",
    height: 98,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 60,
  },
  cancel: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#323841",
  },
  addContainer: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  addToNetwork: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  photoButton: {
    marginTop: 30,
    marginBottom: 8,
    alignSelf: "center",
  },
  inputContainer: {
    marginLeft: 29,
    marginRight: 19,
    marginTop: 16,
    position: "relative",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 16,
    fontWeight: "bold",
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 16,
    backgroundColor: "#FFF",
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    height: 20,
    marginRight: 16,
    resizeMode: "contain",
  },
  continueButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "45%",
    height: 48,
    backgroundColor: "#323841",
    borderRadius: 30,
    marginTop: 64,
    marginBottom: 116,
  },
  continueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "semibold",
  },
  dropdownContainer: {
    position: "relative",
    marginLeft: 29,
    marginRight: 19,
    marginTop: 16,
  },
  dropdownField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 16,
    backgroundColor: "#FFF",
    height: 48,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    paddingVertical: 10,
  },
  dropdownIcon: {
    height: 20,
    marginRight: 16,
    resizeMode: "contain",
  },
  dropdownOption: {
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    justifyContent: "center",
    height: 48,
    borderRadius: 10,
  },
});

export default RequestHelp;
