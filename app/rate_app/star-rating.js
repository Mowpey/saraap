import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StarRating = ({ rating = 0, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleHoverIn = (starIndex) => {
    setHoveredRating(starIndex);
  };

  const handleHoverOut = () => {
    setHoveredRating(0);
  };

  const handlePress = (starIndex) => {
    onRatingChange(starIndex);
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <Pressable
          key={starIndex}
          onHoverIn={() => handleHoverIn(starIndex)}
          onHoverOut={handleHoverOut}
          onPress={() => handlePress(starIndex)}
          style={({ hovered }) => [
            styles.starContainer,
            hovered && styles.hovered,
          ]}
        >
          <Ionicons
            name={
              starIndex <= (hoveredRating || rating) ? "star" : "star-outline"
            }
            size={45}
            color="#FFD700"
          />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  starContainer: {
    padding: 5,
  },
  hovered: {
    transform: [{ scale: 1.1 }],
  },
});

export default StarRating;
