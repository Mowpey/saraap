import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/services/FirebaseConfig";

const AddNewAddress = () => {
  const router = useRouter();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    addressType: "Home",
    addressTitle: "",
    houseNumber: "",
    city: "",
    address: "",
  });

  const toggleAddressType = () => {
    setFormData((prev) => ({
      ...prev,
      addressType: prev.addressType === "Home" ? "Office" : "Home",
    }));
  };

  const handleSave = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert("Error", "You must be logged in to add an address");
        return;
      }

      if (!formData.fullName || !formData.phoneNumber || !formData.address) {
        Alert.alert("Error", "Please fill in all required fields");
        return;
      }

      const addressData = {
        ...formData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "addresses"), addressData);
      Alert.alert("Success", "Address added successfully");
      router.replace("/screen/address/myaddress");
    } catch (error) {
      console.error("Error adding address:", error);
      Alert.alert("Error", "Failed to add address");
    }
  };

  return (
    <View style={styles.container}>
      <Link href="/screen/address/myaddress">
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </Link>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Full Name"
          value={formData.fullName}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, fullName: text }))
          }
        />
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
        />
        <TextInput
          style={styles.inputField}
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, phoneNumber: text }))
          }
        />
        <TouchableOpacity style={styles.inputField} onPress={toggleAddressType}>
          <Text style={styles.inputFieldText}>
            Address Type: {formData.addressType}
          </Text>
          <Text style={styles.inputFieldText}>{"▼"}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputField}
          placeholder="House Number"
          value={formData.houseNumber}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, houseNumber: text }))
          }
        />
        <TextInput
          style={styles.inputField}
          placeholder="City"
          value={formData.city}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, city: text }))
          }
        />
        <TextInput
          style={styles.inputField}
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, address: text }))
          }
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    backgroundColor: "#130E40",
    borderRadius: 5,
    maxWidth: 50,
    padding: 8,
    marginLeft: 20,
    marginTop: 15,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    padding: 24,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputFieldText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    marginHorizontal: 25,
    borderRadius: 10,
    backgroundColor: "#e60023",
    paddingVertical: 16,
    alignItems: "center",
    maxWidth: "auto",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddNewAddress;
