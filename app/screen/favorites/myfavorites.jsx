import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const MyFavouritesScreen = () => {
  return (
    <View style={styles.container}>

      <Link href="/tabs">
        <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </Link>


      <View style={styles.favouriteItem}>
        <Image
          source={{ uri: 'https://www.allrecipes.com/thmb/q-IfK20zxeyp1DgKWhrVp6CQ43w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-89268-triple-dipped-fried-chicken-beauty-4x3-3961ac838ddd41958e7cb9f49376cd68.jpg' }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>Fried Chicken</Text>
          <Text style={styles.itemPrice}>P20.00</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={16} color="#FFD700" />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.favouriteItem}>
        <Image
          source={{ uri: 'https://cdn.jwplayer.com/v2/media/Ra8WKsWU/poster.jpg?width=720' }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>Cheese Sandwich</Text>
          <Text style={styles.itemPrice}>P18.00</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={16} color="#FFD700" />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.favouriteItem}>
        <Image
          source={{ uri: 'https://www.allrecipes.com/thmb/8eg2mEDhj_-wTppSadAddLSXZCw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/11991-egg-noodles-Beauty-3x4-22172e14a61644a8962c42871debbf21.jpg' }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>Egg Pasta</Text>
          <Text style={styles.itemPrice}>P15.00</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={16} color="#FFD700" />
            ))}
          </View>
        </View>
      </View>
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
    maxWidth: 50,
    backgroundColor: '#130E40',
    borderRadius: 20,
    padding: 8,
  },
  favouriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

export default MyFavouritesScreen;