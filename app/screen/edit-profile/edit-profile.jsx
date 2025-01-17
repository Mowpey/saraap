import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Link } from "expo-router";

const EditProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');
  const [userDocId, setUserDocId] = useState(null);

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    
    if (user) {
      setEmail(user.email);
      setOriginalEmail(user.email);
      setFullName(user.displayName || '');
    }

  
    const loadUserData = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setFullName(userData.fullName || '');
          setUserDocId(doc.id);
        });
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [user]);

  const updateUserDocuments = async (updates) => {
    try {
      if (!userDocId) {
        throw new Error('User document ID not found');
      }

      
      const userDocRef = doc(db, 'users', userDocId);
      await updateDoc(userDocRef, updates);

   
      const addressesRef = collection(db, 'addresses');
      const addressQuery = query(addressesRef, where('userId', '==', user.uid));
      const addressSnapshot = await getDocs(addressQuery);
      
      const addressUpdates = addressSnapshot.docs.map((doc) =>
        updateDoc(doc.ref, {
          userEmail: updates.email || user.email,
          userName: updates.fullName || user.displayName,
        })
      );

      await Promise.all(addressUpdates);
    } catch (error) {
      console.error('Error updating documents:', error);
      throw error;
    }
  };

  const handleUpdate = async () => {
    if (!email.trim() || !fullName.trim()) {
      Alert.alert('Error', 'Email and full name are required');
      return;
    }

    setIsLoading(true);
    try {
      const updates = {
        updatedAt: new Date().toISOString()
      };

      
      if (email !== originalEmail) {
        await updateEmail(user, email);
        updates.email = email;
      }

     
      if (password) {
        await updatePassword(user, password);
      }

      
      if (fullName !== user.displayName) {
        await updateProfile(user, {
          displayName: fullName
        });
        updates.fullName = fullName;
      }

    
      await updateUserDocuments(updates);

      Alert.alert(
        'Success',
        'Profile updated successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Error updating profile:', error);
      let errorMessage = 'Failed to update profile';
      
      if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please sign in again before updating these settings';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
     
      <View style={styles.header}>
        <Link href="/tabs/profile" style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Link>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

     
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your email address"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your full name"
            placeholderTextColor="#9CA3AF"
            value={fullName}
            onChangeText={setFullName}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity 
          style={[styles.updateButton, isLoading && styles.disabledButton]}
          onPress={handleUpdate}
          disabled={isLoading}
        >
          <Text style={styles.updateButtonText}>
            {isLoading ? 'Updating...' : 'Update'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
    backgroundColor: "#020452",
    borderRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  updateButton: {
    backgroundColor: '#1E1B4B',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.7,
    backgroundColor: '#666',
  },
});

export default EditProfileScreen;