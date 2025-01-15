import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from 'services/FirebaseConfig.ts';

const MyFavouritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(user ? true : false); 
    });

    return () => unsubscribeAuth();
  }, []);


  useEffect(() => {
    let unsubscribeFavorites = () => {};

    if (user) {
      const favoritesRef = collection(db, "favorites");
      const q = query(
        favoritesRef,
        where("userId", "==", user.uid)
      );

      unsubscribeFavorites = onSnapshot(q, (querySnapshot) => {
        const favoritesArray = [];
        querySnapshot.forEach((doc) => {
          favoritesArray.push({ id: doc.id, ...doc.data() });
        });
        setFavorites(favoritesArray);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching favorites:", error);
        setLoading(false);
      });
    } else {
      setFavorites([]);
    }

    return () => unsubscribeFavorites();
  }, [user]);

  const handleItemPress = (item) => {
    router.push({
      pathname: `/food/${item.productId}`,
      params: {
        id: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        rating: item.rating,
        description: item.description,
        ingredients: item.ingredients,
        likes: item.likes,
        storeName: item.storeName
      }
    });
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.favouriteItem}
      onPress={() => handleItemPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemPrice}>₱{item.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(Math.floor(item.rating))].map((_, index) => (
            <Ionicons key={index} name="star" size={16} color="#FFD700" />
          ))}
          {[...Array(5 - Math.floor(item.rating))].map((_, index) => (
            <Ionicons key={index} name="star-outline" size={16} color="#FFD700" />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Link href="/tabs">
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </Link>

      {!user ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Please login to view favorites</Text>
        </View>
      ) : loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      ) : favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  favouriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
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