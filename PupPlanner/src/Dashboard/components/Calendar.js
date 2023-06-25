import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Get the current month name
  const currentMonthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  // Get the current year
  const currentYear = currentDate.getFullYear();

  // Get the current day of the month
  const currentDay = currentDate.getDate();

  // Calculate the date range for the current week (Sunday to Saturday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDay - currentDate.getDay()); // Adjust to Sunday
  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(currentDay + (6 - currentDate.getDay())); // Adjust to Saturday

  // Generate an array of dates for the current week
  const weekDates = [];
  let currentDateIterator = new Date(startOfWeek);
  while (currentDateIterator <= endOfWeek) {
    weekDates.push(currentDateIterator.getDate());
    currentDateIterator.setDate(currentDateIterator.getDate() + 1);
  }

  // Function to handle the schedule button press
  const handleSchedulePress = () => {
    // Add your logic here for scheduling
    console.log("Schedule button pressed!");
  };

  return (
    <View style={styles.container}>
      {/* Month and arrows */}
      <View style={styles.monthContainer}>
        <TouchableOpacity
          onPress={handlePreviousMonth}
          hitSlop={8}
        >
          <Image source={require("../assets/arrowLeft.png")} />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {currentMonthName} {currentYear}
        </Text>
        <TouchableOpacity
          onPress={handleNextMonth}
          hitSlop={8}
        >
          <Image source={require("../assets/arrowRight.png")} />
        </TouchableOpacity>
      </View>

      {/*Current week rendering*/}
      <View style={styles.weekContainer}>
        {/* Render the days of the week */}
        {weekDates.map((date, index) => {
          const isCurrentDay = date === currentDay; // Check if it's the current day
          return (
            <View
              key={index}
              style={[
                styles.dayContainer,
                isCurrentDay && styles.currentDayContainer,
              ]}
            >
              <Text
                style={[styles.dayText, isCurrentDay && styles.currentDayText]}
              >
                {date}
              </Text>
            </View>
          );
        })}
      </View>
      {/* Sample text */}
      <Text style={styles.scheduleText}>
        Schedule a dog walker or sitter today.
      </Text>
      {/* Schedule button */}
      <TouchableOpacity
        style={styles.scheduleButton}
        onPress={handleSchedulePress}
      >
        <Text style={styles.scheduleButtonText}>Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9EEF6",
    maxHeight: 207,
  },
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  monthText: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  weekContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  dayContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  currentDayContainer: {
    borderWidth: 1,
    borderColor: "#D4874E",
    backgroundColor: "#D4874E",
    borderRadius: 16,
  },
  dayText: {
    fontSize: 16,
  },
  currentDayText: {
    fontWeight: "bold",
    color: "#fff",
  },
  scheduleText: {
    fontSize: 18,
    marginBottom: 16,
  },
  scheduleButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  scheduleButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Calendar;
