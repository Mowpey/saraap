import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const foodDetails = {
  1: {
    name: 'Cherry Healthy',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWczfji7SrBcKRPC6foxzXipwGTKikHaoIdg&s',
    rating: 4.0,
    likes: 14,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper pretium est sollicitudin nec.',
    ingredients: 'Nam quis nibh velit',
    price: '00000'
  },
  2: {
    name: 'Burger',
    image: 'https://www.allrecipes.com/thmb/_OKqViGmlNaa9GV_c4cpwpwApGk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
    rating: 4.4,
    likes: 20,
    description: 'Classic burger with fresh ingredients and special sauce.',
    ingredients: 'Beef patty, lettuce, tomato, cheese',
    price: '00000'
  },
  3: {
    name: 'Carbonara',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3xmBLnEEZiONfdpuyDNCZadCZbi3qmGZSAQ&s',
    rating: 3.8,
    likes: 10,
    description: 'Traditional Italian pasta with creamy sauce.',
    ingredients: 'Pasta, eggs, pancetta, cheese',
    price: '00000'
  }
};

const FoodDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const food = foodDetails[id];

  if (!food) {
    return (
      <View style={styles.container}>
        <Text>Food item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Link href="\tabs" style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </Link>
        <Image
          source={{ uri: food.image }}
          style={styles.foodImage}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.title}>{food.name}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(Math.floor(food.rating))].map((_, index) => (
                <Ionicons key={index} name="star" size={16} color="#FFD700" />
              ))}
              {[...Array(5 - Math.floor(food.rating))].map((_, index) => (
                <Ionicons key={index} name="star-outline" size={16} color="#FFD700" />
              ))}
              <Text style={styles.ratingText}>{food.rating}</Text>
            </View>
          </View>
          <View style={styles.likesContainer}>
            <Text style={styles.likesText}>{food.likes}</Text>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.description}>
          {food.description}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          <Text style={styles.sectionContent}>
            {food.ingredients}
          </Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text style={styles.price}>₱ {food.price}</Text>
          </View>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      imageContainer: {
        position: 'relative',
        width: '100%',
        height: 300,
      },
      backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
      },
      foodImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      contentContainer: {
        padding: 20,
        marginTop: -20,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      },
      headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      ratingText: {
        marginLeft: 5,
        color: '#666',
      },
      likesContainer: {
        alignItems: 'center',
      },
      likesText: {
        marginBottom: 5,
        color: '#666',
      },
      description: {
        color: '#666',
        lineHeight: 20,
        marginBottom: 20,
      },
      section: {
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      sectionContent: {
        color: '#666',
        lineHeight: 20,
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
      },
      priceLabel: {
        color: '#666',
        marginBottom: 5,
      },
      price: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      orderButton: {
        backgroundColor: '#1a1a1a',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
      },
      orderButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default FoodDetailScreen;