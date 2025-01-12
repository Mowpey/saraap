import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const FoodDetailScreen = () => {
  const params = useLocalSearchParams();

  if (!params) {
    return (
      <View style={styles.container}>
        <Text>Food item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Link href="/tabs" style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </Link>
        <Image source={{ uri: params.image }} style={styles.foodImage} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.title}>{params.name}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(Math.floor(Number(params.rating)))].map((_, index) => (
                <Ionicons key={index} name="star" size={16} color="#FFD700" />
              ))}
              {[...Array(5 - Math.floor(Number(params.rating)))].map(
                (_, index) => (
                  <Ionicons
                    key={index}
                    name="star-outline"
                    size={16}
                    color="#FFD700"
                  />
                )
              )}
              <Text style={styles.ratingText}>{params.rating}</Text>
            </View>
          </View>
          <View style={styles.likesContainer}>
            <Text style={styles.likesText}>{params.likes}</Text>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.description}>{params.description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          <Text style={styles.sectionContent}>{params.ingredients}</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text style={styles.price}>{"₱" + params.price}</Text>
          </View>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
  foodImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 20,
    marginTop: -20,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    color: "#666",
  },
  likesContainer: {
    alignItems: "center",
  },
  likesText: {
    marginBottom: 5,
    color: "#666",
  },
  description: {
    color: "#666",
    lineHeight: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    color: "#666",
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  priceLabel: {
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  orderButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FoodDetailScreen;
