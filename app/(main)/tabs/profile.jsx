import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { router } from 'expo-router';


const firebaseConfig = {
  apiKey: "AIzaSyD3FNa4HBT7WeBJ6mZuoYkkwB6BOwkofRU",
  authDomain: "sample-db-f2f07.firebaseapp.com",
  projectId: "sample-db-f2f07",
  storageBucket: "sample-db-f2f07.firebasestorage.app",
  messagingSenderId: "73209412204",
  appId: "1:73209412204:web:d69248956e50a446143649",
  measurementId: "G-JYLBYNMHB1",
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
     
        router.replace('/signin');
      }
    });

   
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
   
      router.replace('/signin');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {user ? (
          <>
            <View style={styles.profilePicture}>
              <Text style={styles.initials}>
                {user.displayName 
                  ? user.displayName.charAt(0).toUpperCase()
                  : user.email.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.name}>
              {user.displayName || user.email.split('@')[0]}
            </Text>
            <Text style={styles.email}>{user.email}</Text>
          </>
        ) : (
          <Text style={styles.name}>Not signed in</Text>
        )}
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
            <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={24} color="#ff3b30" />
              <Text style={[styles.menuItemText, { color: '#ff3b30' }]}>Sign Out</Text>
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