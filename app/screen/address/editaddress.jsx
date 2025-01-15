import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/FirebaseConfig";
import { useSearchParams } from "expo-router/build/hooks";

const EditAddress = () => {
  const router = useRouter();
  const params = useSearchParams();
  const auth = getAuth();

  const [formData, setFormData] = useState(() => ({
    fullName: params?.fullName || "",
    email: params?.email || "",
    phoneNumber: params?.phoneNumber || "",
    addressType: params?.addressType || "Home",
    addressTitle: params?.addressTitle || "",
    houseNumber: params?.houseNumber || "",
    city: params?.city || "",
    address: params?.address || "",
  }));

  useEffect(() => {
    if (!params) return;

    const newFormData = {
      fullName: params.get("fullName") || "",
      email: params.get("email") || "",
      phoneNumber: params.get("phoneNumber") || "",
      addressType: params.get("addressType") || "Home",
      addressTitle: params.get("addressTitle") || "",
      houseNumber: params.get("houseNumber") || "",
      city: params.get("city") || "",
      address: params.get("address") || "",
    };
    if (JSON.stringify(newFormData) !== JSON.stringify(formData)) {
      setFormData(newFormData);
    }
  }, []);

  const handleSave = async () => {
    console.log("Saving:", formData);
    try {
      const addressId = params.get("addressId");
      if (!addressId) {
        alert("Error: Address ID not found");
        return;
      }

      const addressRef = doc(db, "addresses", addressId);
      await updateDoc(addressRef, {
        ...formData,
        updatedAt: new Date().toISOString(),
      });

      await updateDoc(addressRef, {
        ...formData,
        updatedAt: new Date().toISOString(),
      });

      alert("Address updated successfully");

      router.replace("/screen/address/myaddress");
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address");
    }
  };

  const toggleAddressType = () => {
    setFormData((prev) => ({
      ...prev,
      addressType: prev.addressType === "Home" ? "Office" : "Home",
    }));
  };

  const handleBack = () => {
    router.push("/screen/address/myaddress");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>

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
        <Text style={styles.saveButtonText}>Save Changes</Text>
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

export default EditAddress;
