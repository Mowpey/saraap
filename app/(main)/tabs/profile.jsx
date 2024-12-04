import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Account');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profilePicture}>
          <Text style={styles.initials}>MA</Text>
        </View>
        <Text style={styles.name}>Mark Angelo</Text>
        <Text style={styles.email}>mark.angelo@gmail.com</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Account' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Account')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Account' && styles.activeTabText,
          ]}>
            Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Rate App' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Rate App')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Rate App' && styles.activeTabText,
          ]}>
            Rate App
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        {activeTab === 'Account' && (
          <View>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={24} color="#333" />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="home-outline" size={24} color="#333" />
              <Text style={styles.menuItemText}>Home Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#333" />
              <Text style={styles.menuItemText}>Security</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="card-outline" size={24} color="#333" />
              <Text style={styles.menuItemText}>Payments</Text>
            </TouchableOpacity>
          </View>
        )}
        {activeTab === 'Rate App' && (
           <View>
           <TouchableOpacity style={styles.menuItem}>
             <Ionicons name="star-outline" size={24} color="#333" />
             <Text style={styles.menuItemText}>Rate App</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.menuItem}>
             <Ionicons name="help" size={24} color="#333" />
             <Text style={styles.menuItemText}>Help Center</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.menuItem}>
             <Ionicons name="shield-sharp" size={24} color="#333" />
             <Text style={styles.menuItemText}>Privacy & Policy</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.menuItem}>
             <Ionicons name="newspaper-outline" size={24} color="#333" />
             <Text style={styles.menuItemText}>Terms & Conditions</Text>
           </TouchableOpacity>
         </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#130E40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#130E40',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#130E40',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
});

export default ProfileScreen;