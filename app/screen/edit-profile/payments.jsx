import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";

const PaymentMethodsScreen = ({ navigation }) => {
  const paymentMethods = [
    {
      id: 1,
      type: 'visa',
      lastFourDigits: '4578',
      expiryDate: '04/24',
    },
    {
      id: 2,
      type: 'mastercard',
      lastFourDigits: '2478',
      expiryDate: '05/24',
    },
    {
      id: 3,
      type: 'paypal',
      name: 'Maciej Kowalski',
    },
  ];

  const renderCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return '💳'; 
      case 'mastercard':
        return '💳'; 
      case 'paypal':
        return '🅿️'; 
      default:
        return '💳';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
    
      <View style={styles.header}>
      <Link href="/tabs/profile" style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Link>
        <Text style={styles.headerTitle}>Payment methods</Text>
      </View>

      <View style={styles.methodsContainer}>
        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.methodItem}>
            <View style={styles.methodInfo}>
              <Text style={styles.cardIcon}>{renderCardIcon(method.type)}</Text>
              <View style={styles.cardDetails}>
                {method.lastFourDigits ? (
                  <Text style={styles.cardNumber}>
                    •••• •••• •••• {method.lastFourDigits}
                  </Text>
                ) : (
                  <Text style={styles.cardNumber}>{method.name}</Text>
                )}
                {method.expiryDate && (
                  <Text style={styles.expiryDate}>Expires {method.expiryDate}</Text>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

  
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.addCardButton}
          onPress={() => console.log('Add card pressed')}
        >
          <Text style={styles.addCardButtonText}>Add card</Text>
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
  methodsContainer: {
    padding: 16,
  },
  methodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardDetails: {
    justifyContent: 'center',
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  expiryDate: {
    fontSize: 12,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    color: '#130E40',
    fontSize: 14,
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
  addCardButton: {
    backgroundColor: '#130E40',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addCardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentMethodsScreen;