import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import { getProducts } from "@/services/products/crud_product";
import { getStores } from "@/services/store/crud_store";

const { width } = Dimensions.get("window");

export default function App() {
  const [activeTab, setActiveTab] = useState("");
  const [storeData, setStoreData] = useState([]);
  const [products, setProducts] = useState({});
  const [featuredProducts, setFeaturedProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const stores = await getStores();
        const activeStores = stores.filter((store) => store.status);

        setStoreData(activeStores);

        if (activeStores.length > 0) {
          setActiveTab(activeStores[0].id);
        }
        const storeNameMap = activeStores.reduce((acc, store) => {
          acc[store.id] = store.storeName;
          return acc;
      
        }, {});
    
        let allProducts = [];
        let storeProductsMap = {};

        for (const store of activeStores) {
          const storeProducts = await getProducts(store.id);
          const activeProducts = storeProducts.filter(
            (product) => product.status
          );


          if (activeProducts.length > 0) {
            allProducts = [
              ...allProducts,
              ...activeProducts.map((product) => ({
                id: product.id,
                productName: product.productName,
                category: product.category,
                price: product.price,
                img: product.img,
                storeId: store.id,
                storeName: storeNameMap[store.id], // Look up store name using ID
                status: product.status,
                rating: 4.5,
              })),
            ];

            storeProductsMap[store.id] = {
              storeId: store.id,
              storeName: store.storeName,
              products: activeProducts.map((product) => ({
                id: product.id,
                productName: product.productName,
                category: product.category,
                price: product.price,
                img: product.img,
                storeId: store.id,
                storeName: storeNameMap[store.id], // Look up store name using ID
                status: product.status,
                rating: 4.5,
              })),
            };
          }
        }

        setFeaturedProducts(
          allProducts.slice(0, 3).map((product) => ({
            id: product.id,
            uri: product.img,
            title: product.productName,
            ratings: product.rating.toString(),
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            ingredients: "Nam quis nibh velit",
            price: product.price,
            likes: Math.floor(Math.random() * 20) + 5,
            storeName: storeNameMap[product.storeId] // Use storeId to look up the store name
          }))
        );
        

        setProducts(storeProductsMap);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getActiveData = () => {
    return activeTab ? [products[activeTab]] : [];
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstLayer}>
        <Link href="/screen/address/myaddress" asChild>
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textPrimary}>Golden Harvest Subdi.</Text>
              <Text style={styles.textSub}>Tuguegarao City, Cagayan</Text>
            </View>
            <Entypo name="location" style={styles.buttonIcon} />
          </TouchableOpacity>
        </Link>
        <Link href="/screen/favorites/myfavorites">
          <TouchableOpacity style={styles.faveContainer}>
            <MaterialIcons name="favorite" style={styles.faveIcon} />
          </TouchableOpacity>
        </Link>
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
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {featuredProducts.map((product) => (
  <Link
    key={product.id}
    href={{
      pathname: "/screen/food_details/[id]",
      params: {
        id: product.id,
        name: product.title,
        image: product.uri,
        rating: product.ratings,
        likes: product.likes,
        description: product.description,
        ingredients: product.ingredients,
        price: product.price,
        storeName: product.storeName // Add this line to pass the store name
      },
    }}
    style={styles.card}
            >
              <Image source={{ uri: product.uri }} style={styles.image} />
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.ratings}>
                {product.ratings}{" "}
                <Entypo name="star" size={20} color="yellow" />
              </Text>
            </Link>
          ))}
        </ScrollView>
      </View>

      <View style={styles.tabSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {storeData.map((store) => (
            <TouchableOpacity
              key={store.id}
              onPress={() => setActiveTab(store.id)}
              style={[styles.tab, activeTab === store.id && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === store.id && styles.activeTabText,
                ]}
              >
                {store.storeName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          style={styles.foodList}
          showsVerticalScrollIndicator={false}
        >

          {getActiveData().map(
            (store) =>
              store && (
                <View key={store.storeName}>
                  {store.products &&
                    store.products.map((item) => (
                      <Link
                        key={item.id}
                        href={{
                          pathname: "/screen/food_details/[id]",
                          params: {
                            id: item.id,
                            name: item.productName,
                            image: item.img,
                            rating: item.rating,
                            likes: Math.floor(Math.random() * 20) + 5, // Example random likes
                            description:
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            ingredients:
                              "Fresh ingredients from local suppliers",
                            price: item.price,
                            storeName: store.storeName
                          },
                        }}
                        
                      >
                        <TouchableOpacity style={styles.foodItem}>
                          <Image
                            source={{ uri: item.img }}
                            style={styles.foodImage}
                          />
                          <View style={styles.foodInfo}>
                            <Text style={styles.foodName}>
                              {item.productName}
                            </Text>
                            <Text style={styles.foodPrice}>
                              {"₱" + item.price}
                            </Text>
                            <View style={styles.ratingContainer}>
                              <Text style={styles.stars}>
                                {"★".repeat(Math.floor(item.rating))}
                                {"☆".repeat(5 - Math.floor(item.rating))}
                              </Text>
                              <Text style={styles.ratingNumber}>
                                {" "}
                                {item.rating}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Link>
                    ))}
                </View>
              )
          )}
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
    flexDirection: "row",
    gap: 25,
  },
  buttonContainer: {
    flex: 1,
    maxWidth: "auto",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 50,
    borderRadius: 8,
    backgroundColor: "#130E40",
    alignItems: "center",
  },
  textContainer: {
    gap: 5,
    lineHeight: 1.5,
    letterSpacing: -0.05,
    textTransform: "capitalize",
  },
  textPrimary: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textSub: {
    color: "#DEE1EA",
    fontSize: 12,
  },
  buttonIcon: {
    color: "#fff",
    fontSize: 25,
  },
  faveContainer: {
    paddingTop: 15,
  },
  faveIcon: {
    flex: 1,
    backgroundColor: "transparent",
    fontSize: 30,
    color: "#AE445A",
  },
  searchContainer: {
    marginTop: 5,
  },
  searchField: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 20,
  },
  tabSection: {
    marginTop: -10,
  },
  tabContainer: {
    flexDirection: "row",
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    height: 40,
  },
  tab: {
    paddingHorizontal: 15,
    marginRight: 15,
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 14,
    color: "#888",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#130E40",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#130E40",
  },
  secondLayer: {
    alignItems: "center",
    paddingTop: 10,
  },
  scrollView: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.6,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    padding: 16,
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginVertical: 0,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  foodInfo: {
    flex: 1,
    justifyContent: "center",
  },
  foodName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    color: "#FFD700",
    letterSpacing: 2,
  },
  ratingNumber: {
    color: "#666",
    marginLeft: 5,
  },
});
