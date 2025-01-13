import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "services/FirebaseConfig.ts";


const FoodDetailScreen = () => {
  const params = useLocalSearchParams();
  const [isAddingToOrder, setIsAddingToOrder] = useState(false);
  const auth = getAuth();

  if (!params) {
    return (
      <View style={styles.container}>
        <Text>Food item not found</Text>
      </View>
    );
  }

  const handleAddToOrder = async () => {
    if (!auth.currentUser) {
      Alert.alert("Error", "Please login to place an order");
      return;
    }

    setIsAddingToOrder(true);
    try {
      const orderData = {
        userId: auth.currentUser.uid,
        productId: params.id,
        quantity: 1, // Default to 1, you could add a quantity selector
        price: parseFloat(String(params.price)),
        status: "in_order",
        createdAt: new Date(),
        storeName: params.storeName, // Fallback to avoid undefined
        productName: params.name, // For easier querying/display
        productImage: params.image, // Store the image URL
        orderNumber: `ORD${Date.now()}`, // Unique order number
        customerName: auth.currentUser.displayName || "Guest",
        customerEmail: auth.currentUser.email,
        totalAmount: parseFloat(String(params.price)), // price * quantity
      };

      const inProgressRef = collection(db, "in_progress");
      await addDoc(inProgressRef, orderData);
      
      Alert.alert(
        "Success",
        "Item added to orders!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } catch (error) {
      console.error("Error adding to order:", error);
      Alert.alert(
        "Error",
        "Failed to add item to orders. Please try again."
      );
    } finally {
      setIsAddingToOrder(false);
    }
  };

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
          <TouchableOpacity 
            style={[
              styles.orderButton,
              isAddingToOrder && styles.orderButtonDisabled
            ]}
            onPress={handleAddToOrder}
            disabled={isAddingToOrder}
          >
            <Text style={styles.orderButtonText}>
              {isAddingToOrder ? "Adding..." : "Add to orders"}
            </Text>
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
