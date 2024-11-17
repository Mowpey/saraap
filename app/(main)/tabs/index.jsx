import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { ScrollView, View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, TextInput, Pressable } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  {
    id: 1,
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWczfji7SrBcKRPC6foxzXipwGTKikHaoIdg&s',
    title: 'Cherry Healthy',
    ratings: '4.6',
  },
  {
    id: 2,
    uri: 'https://www.allrecipes.com/thmb/_OKqViGmlNaa9GV_c4cpwpwApGk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
    title: 'Burger',
    ratings: '4.4',
  },
  {
    id: 3,
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3xmBLnEEZiONfdpuyDNCZadCZbi3qmGZSAQ&s',
    title: 'Carbonara',
    ratings: '3.8',
  },
];

const newTasteItems = [
  {
    id: 1,
    name: 'Soup',
    price: '000000',
    rating: 4.1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4yXMG6VQlvi5Z8ErBIJ1frJCnF_hCNyIQQ&s'
  },
  {
    id: 2,
    name: 'Chicken',
    price: '000000',
    rating: 4.7,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMgZG3x99SMnWwv6OkticJ4JQG1m9Qg3Wu0g&s'
  },
  {
    id: 3,
    name: 'Shrimp',
    price: '000000',
    rating: 3.2,
    image: 'https://www.seriouseats.com/thmb/ch4c6o15shxPyfO8jnSfUh_wQ0s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__08__09102015-grilled-lemongrass-shrimp-shaozhizhong-8-a5525792ce7a4c9693af0a564eae74a4.jpg'
  },
  {
    id: 4,
    name: 'Burger',
    price: '000000',
    rating: 3.2,
    image: 'https://assets.unileversolutions.com/recipes-v2/243652.jpg'
  }
];

const popularItems = [
  {
    id: 1,
    name: 'Pizza',
    price: '000000',
    rating: 4.8,
    image: 'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg'
  },
  {
    id: 2,
    name: 'Sushi',
    price: '000000',
    rating: 4.6,
    image: 'https://cdn.britannica.com/52/128652-050-14AD19CA/Maki-zushi.jpg'
  },
  {
    id: 3,
    name: 'Pasta',
    price: '000000',
    rating: 4.5,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjyhQhuaq9lhzjwT7gZur76QjviLeQc9D6Gw&s'
  }
];

const recommendedItems = [
  {
    id: 1,
    name: 'Salad',
    price: '000000',
    rating: 4.3,
    image: 'https://www.eatingwell.com/thmb/CcLY-9Ru3OWpd5k_V-hoxlk4whg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chopped-power-salad-with-chicken-hero-1x1-0178-475bbf1bbd884d5d97fc236b8975dff2.jpg'
  },
  {
    id: 2,
    name: 'Ramen',
    price: '000000',
    rating: 4.6,
    image: 'https://cdn.britannica.com/77/234877-050-01EC3819/Tonkotsu-ramen.jpg'
  },
  {
    id: 3,
    name: 'Steak',
    price: '000000',
    rating: 4.7,
    image: 'https://www.allrecipes.com/thmb/OJ28fIFte6Pyg93ML8IM-APbu1Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-14554-sirloin-steak-with-garlic-butter-hero-4x3-d12fa79836754fcf850388e4677bbf55.jpg'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('New Taste');
  const tabs = ['New Taste', 'Popular', 'Recommended'];

  const getActiveData = () => {
    switch (activeTab) {
      case 'Popular':
        return popularItems;
      case 'Recommended':
        return recommendedItems;
      default:
        return newTasteItems;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstLayer}>
        <TouchableOpacity style={styles.buttonContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textPrimary}>Golden Harvest Subdi.</Text>
            <Text style={styles.textSub}>Tuguegarao City, Cagayan</Text>
          </View>
          <Entypo name="location" style={styles.buttonIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faveContainer}>
          <MaterialIcons name="favorite" style={styles.faveIcon}/>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchField} 
          placeholder="Search Something..." 
        />
      </View>

      <View style={styles.secondLayer}>
        <ScrollView
          horizontal
          alwaysBounceHorizontal={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {images.map((image) => (
            <Pressable key={image.id} style={styles.card}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <Text style={styles.title}>{image.title}</Text>
              <Text style={styles.ratings}>{image.ratings} <Entypo name="star" size={20} color="yellow" /></Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.tabSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
              ]}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView 
          style={styles.foodList}
          showsVerticalScrollIndicator={false}
        >
          {getActiveData().map((item) => (
            <TouchableOpacity key={item.id} style={styles.foodItem}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.foodImage} 
              />
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodPrice}>$ {item.price}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.stars}>
                    {'★'.repeat(Math.floor(item.rating))}
                    {'☆'.repeat(5 - Math.floor(item.rating))}
                  </Text>
                  <Text style={styles.ratingNumber}> {item.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 15,
    gap: 20,
  },
  firstLayer: {
    flexDirection: 'row',
    gap: 25,
  },
  buttonContainer: {
    flex: 1,
    maxWidth: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 30,
    borderRadius: 8,
    backgroundColor: '#130E40',
    alignItems: 'center',
  },
  textContainer: {
    gap: 5,
    lineHeight: 1.5,
    letterSpacing: -0.05,
    textTransform: 'capitalize',
  },
  textPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSub: {
    color: '#DEE1EA',
    fontSize: 12,
  },
  buttonIcon: {
    color: '#fff',
    fontSize: 25,
  },
  faveContainer: {
    paddingTop: 15,
  },
  faveIcon: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 30,
    color: '#AE445A',
  },
  searchContainer: {
    marginTop: 5,
  },
  searchField: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 20,
  },
  tabSection: {
    flex: 1,
    marginTop: -10
  },
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 100,
  },
  tab: {
    paddingHorizontal: 15,
    marginRight: 15,
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  activeTabText: {
    color: '#130E40',
    fontWeight: '500',
  },
  secondLayer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  scrollView: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.6, 
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
  },
  ratings: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontSize: 14,
  },
  foodList: {
    marginTop: 5,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 0
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  foodInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    color: '#FFD700',
    letterSpacing: 2,
  },
  ratingNumber: {
    color: '#666',
    marginLeft: 5,
  }
});