import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";


const SecurityScreen = ({ navigation }) => {
  const [isBiometricEnabled, setBiometricEnabled] = useState(true);
  const [isRememberMeEnabled, setRememberMeEnabled] = useState(true);
  const [isFaceIdEnabled, setFaceIdEnabled] = useState(false);

  const securityOptions = [
    {
      id: 1,
      title: 'Remember me',
      description: 'Save account info for future use',
      value: isRememberMeEnabled,
      onValueChange: setRememberMeEnabled,
    },
    {
      id: 2,
      title: 'Biometric ID',
      description: 'Use fingerprint for authentication',
      value: isBiometricEnabled,
      onValueChange: setBiometricEnabled,
    },
    {
      id: 3,
      title: 'Face ID',
      description: 'Use Face ID for authentication',
      value: isFaceIdEnabled,
      onValueChange: setFaceIdEnabled,
    },
  ];

  const actions = [
    {
      id: 1,
      title: 'Change PIN',
      icon: 'key-outline',
    },
    {
      id: 2,
      title: 'Change password',
      icon: 'lock-closed-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
     
      <View style={styles.header}>
      <Link href="/tabs/profile" style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Link>
        <Text style={styles.headerTitle}>Security</Text>
      </View>

    
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Options</Text>
        {securityOptions.map((option) => (
          <View key={option.id} style={styles.optionItem}>
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#FFD7BC' }}
              thumbColor={option.value ? '#FF5F00' : '#f4f3f4'}
              onValueChange={option.onValueChange}
              value={option.value}
            />
          </View>
        ))}
      </View>

      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Actions</Text>
        {actions.map((action) => (
          <TouchableOpacity 
            key={action.id} 
            style={styles.actionItem}
            onPress={() => console.log(`${action.title} pressed`)}
          >
            <View style={styles.actionInfo}>
              <Ionicons name={action.icon} size={24} color="#000" style={styles.actionIcon} />
              <Text style={styles.actionTitle}>{action.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

    
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={() => console.log('Lock account pressed')}
        >
          <Text style={styles.emergencyButtonText}>Lock Account</Text>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    backgroundColor: "#020452",
    borderRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionInfo: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
  },
  emergencyButton: {
    backgroundColor: '#130E40',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SecurityScreen;