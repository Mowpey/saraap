import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const AddNewAddress = () => {
  return (
    <View style={styles.container}>
      <Link href="/screen/address/myaddress">
        <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </Link>


      <View style={styles.formContainer}>
        <TextInput style={styles.inputField} placeholder="Name" />
        <TextInput style={styles.inputField} placeholder="Email" />
        <TextInput style={styles.inputField} placeholder="Phone Number" />
        <View style={styles.inputField}>
          <Text style={styles.inputFieldText}>Address Type</Text>
          <TouchableOpacity>
            <Text style={styles.inputFieldText}>{'▼'}</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.inputField} placeholder="Address Title" />
        <TextInput style={styles.inputField} placeholder="City" />
        <TextInput style={styles.inputField} placeholder="Address" />
      </View>

      <Link href="/screen/address/myaddress" asChild>
        <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    backgroundColor: '#130E40',
    borderRadius: 5,
    maxWidth: 50,
    padding: 8,
    marginLeft: 20,
    marginTop: 15,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 24,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputFieldText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    marginHorizontal: 25,
    borderRadius: 10,
    backgroundColor: '#e60023',
    paddingVertical: 16,
    alignItems: 'center',
    maxWidth: "auto",
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddNewAddress;