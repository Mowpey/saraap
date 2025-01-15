import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/FirebaseConfig";
import { useRouter } from "expo-router";

const MyAddressesScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  const fetchUserAddresses = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setAddresses([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const addressQuery = query(
        collection(db, "addresses"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(addressQuery);

      const addressList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAddresses(addressList);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserAddresses();
    }, [fetchUserAddresses])
  );

  const handleEdit = (address) => {
    router.push({
      pathname: "/screen/address/editaddress",
      params: {
        mode: "edit",
        addressId: address.id,
        fullName: address.fullName,
        email: address.email,
        phoneNumber: address.phoneNumber,
        houseNumber: address.houseNumber,
        city: address.city,
        address: address.address,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Link href="/tabs">
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </Link>

      {addresses.map((address) => (
        <View key={address.id} style={styles.addressSection}>
          <Text style={styles.sectionTitle}>
            {`${address.fullName}'s Address`}
          </Text>
          <View style={styles.addressDetails}>
            <Text style={styles.addressText}>{address.fullName}</Text>
            <Text style={styles.addressText}>{address.phoneNumber}</Text>
            <Text style={styles.addressText}>{address.houseNumber}</Text>
            <Text style={styles.addressText}>{address.address}</Text>
            <Text style={styles.addressText}>{address.city}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(address)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Link href="/screen/address/newaddress">
        <TouchableOpacity style={styles.addNewButton}>
          <Ionicons name="add-circle-outline" size={24} color="#130E40" />
          <Text style={styles.addNewButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  backButton: {
    backgroundColor: "#130E40",
    borderRadius: 5,
    maxWidth: 50,
    padding: 8,
  },
  addressSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressDetails: {
    marginBottom: 10,
  },
  addressText: {
    fontSize: 16,
    color: "#666",
    marginVertical: 2,
  },
  editButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#130E40",
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  addNewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  addNewButtonText: {
    color: "#130E40",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default MyAddressesScreen;
