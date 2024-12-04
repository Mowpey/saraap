import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const MyAddressesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

   
      <Link href="/tabs">
        <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </Link>

  
      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>My Home Address</Text>
        <View style={styles.addressDetails}>
          <Text style={styles.addressText}>Home</Text>
          <Text style={styles.addressText}>(503) 338-5200</Text>
          <Text style={styles.addressText}>15612 Fisher Island Dr</Text>
          <Text style={styles.addressText}>Miami Beach, Florida(FL), 33109</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

    
      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>My Office Address</Text>
        <View style={styles.addressDetails}>
          <Text style={styles.addressText}>Office</Text>
          <Text style={styles.addressText}>(503) 338-5200</Text>
          <Text style={styles.addressText}>15612 Fisher Island Dr</Text>
          <Text style={styles.addressText}>Miami Beach, Florida(FL), 33109</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      
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
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  backButton: {
    backgroundColor: '#130E40',
    borderRadius: 5,
    maxWidth: 50,
    padding: 8,
  },
  addressSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressDetails: {
    marginBottom: 10,
  },
  addressText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 2,
  },
  editButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#130E40',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addNewButtonText: {
    color: '#130E40',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default MyAddressesScreen;