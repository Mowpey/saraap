import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Animated, Alert, RefreshControl,ActivityIndicator} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Link } from "expo-router";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { db } from "services/FirebaseConfig.ts";
import { useLocalSearchParams, useRouter } from "expo-router";

  
const getButtonText = (orders, deliveryTime) => {
  if (!orders || orders.length === 0) return null;
  
  const allInOrder = orders.every(order => order.status === 'in_order');
  const anyInProgress = orders.some(order => order.status === 'in_progress');
  const allFinished = orders.every(order => order.status === 'finished');
  
  if (allFinished) {
    return null;
  } else if (anyInProgress) {
    const minutes = Math.floor(deliveryTime / 60);
    const seconds = deliveryTime % 60;
    return `Estimated Delivery: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  } else if (allInOrder) {
    return 'Review Payment and Address';
  }
  return 'Review Payment and Address';
};
const useInProgressOrders = () => {
  const [orders, setOrders] = useState([]);
  const [finishedorders,setFinishedOrders] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(10);
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'in_progress', orderId);
      await updateDoc(orderRef, {
        status: newStatus
      });
      
      if (newStatus === 'finished') {
        setDeliveryMessage('The food has been delivered!');
        // Immediately remove finished orders from the state
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        fetchFinishedOrders();
        // Clear the message after 5 seconds
        setTimeout(() => {
          setDeliveryMessage('');
        }, 5000);
      } else {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId 
              ? { ...order, status: newStatus }
              : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };
      //copy and modify this
      const fetchFinishedOrders = async () => {
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          
          if (!user) {
            console.log('No user logged in');
            setLoading(false);
            return;
          }
          const q = query(
            collection(db, 'in_progress'),
            where('userId', '==', user.uid),
          );
    
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        
      }))
      .filter(order => order.status == 'finished'); 
          setFinishedOrders(ordersData);
        } catch (err) {
          console.error('Error fetching orders:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

  const fetchOrders = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }
      const q = query(
        collection(db, 'in_progress'),
        where('userId', '==', user.uid),
      );

      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs
  .map(doc => ({
    id: doc.id,
    ...doc.data(),
    
  }))
  .filter(order => order.status !== 'finished'); 
      setOrders(ordersData);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderQuantity = async (orderId, newQuantity, newTotalAmount) => {
    try {
      const orderRef = doc(db, 'in_progress', orderId);
      await updateDoc(orderRef, {
        quantity: newQuantity,
        totalAmount: newTotalAmount
      });
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, quantity: newQuantity, totalAmount: newTotalAmount }
            : order
        )
      );
    } catch (error) {
      throw error;
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const orderRef = doc(db, 'in_progress', orderId);
      await deleteDoc(orderRef);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await Promise.all([fetchOrders(), fetchFinishedOrders()]);
      setLoading(false);
    };
    
    loadInitialData();
  }, []);

  return { 
    orders, 
    finishedorders,
    loading, 
    error, 
    updateOrderQuantity,
    deleteOrder,
    refreshOrders: fetchOrders,
    updateOrderStatus,
    deliveryTime,
    setDeliveryTime,
    deliveryMessage,
    setDeliveryMessage
  };
};

const OrdersScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const auth = getAuth();
  const [activeTab, setActiveTab] = useState('In Progress');
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const { 
    orders, 
    finishedorders,
    loading, 
    error, 
    updateOrderQuantity, 
    deleteOrder, 
    refreshOrders,
    updateOrderStatus,
    deliveryTime,
    setDeliveryTime,
    deliveryMessage,
    setDeliveryMessage
  } = useInProgressOrders();

  useEffect(() => {
    let timer;
    const inProgressOrders = orders.filter(order => order.status === 'in_progress');
    
    if (inProgressOrders.length > 0 && deliveryTime > 0) {
      timer = setInterval(() => {
        setDeliveryTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Update each in_progress order to finished
            Promise.all(
              inProgressOrders.map(async (order) => {
                await updateOrderStatus(order.id, 'finished');
              })
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [orders, deliveryTime]);
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
  });
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshOrders();
    } catch (error) {
      console.error('Error refreshing orders:', error);
      Alert.alert('Error', 'Failed to refresh orders');
    } finally {
      setIsRefreshing(false);
    }
  };
  
  useEffect(() => {
    refreshOrders();
  }, []);

  useEffect(() => {
    if (activeTab === 'In Progress') {
      refreshOrders();
    }
  }, [activeTab]);
 
  const showEmptyState = () => {
    // Only show empty state if:
    // 1. We're on the In Progress tab
    // 2. Either there are no orders, or none of them are in_progress/in_order
    if (deliveryMessage) return false;
    if (activeTab !== 'In Progress') return false;
    
    if (!orders || orders.length === 0) return true;
    
    return !orders.some(order => 
      order.status === 'in_progress' || order.status === 'in_order'
    );
  };

  const handleReviewPayment = () => {
    const userId = auth.currentUser?.uid;
    // Calculate total amount from all orders
    const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Get store name from the first order (assuming all orders are from the same store)
    const storeName = orders[0]?.storeName || '';
    const customerName = auth.currentUser?.displayName || '';
    
    router.push({
      pathname: "/screen/payment_order/payment_address",
      params: {
        userId: userId,
        totalAmount: totalAmount,
        orderCount: orders.length,
        storeName: storeName,

      }
    });
  };
  
  const handleIncrement = async (order) => {
    try {
      const newQuantity = order.quantity + 1;
      const newTotalAmount = order.price * newQuantity;
      await updateOrderQuantity(order.id, newQuantity, newTotalAmount);
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  const handleDecrement = async (order) => {
    try {
      if (order.quantity === 1) {
        Alert.alert(
          'Remove Item',
          'Do you want to remove this item from your order?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Remove',
              onPress: async () => {
                try {
                  await deleteOrder(order.id);
                } catch (error) {
                  console.error('Error deleting order:', error);
                  Alert.alert('Error', 'Failed to remove item');
                }
              },
              style: 'destructive',
            },
          ]
        );
      } else {
        const newQuantity = order.quantity - 1;
        const newTotalAmount = order.price * newQuantity;
        await updateOrderQuantity(order.id, newQuantity, newTotalAmount);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  useEffect(() => {
    const toValue = activeTab === 'In Progress' ? 30 : 150;
    Animated.timing(indicatorPosition, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  const pastOrders = [
    { id: 1, title: 'Fries', count: '1 item • ₱ 45', image: require('@/assets/images/fries.png'), date: 'Nov 3', time: '14:00' },
    { id: 2, title: 'Yum Burger', count: '1 item • ₱ 40', image: require('@/assets/images/yumburger.png'), date: 'Nov 3', time: '09:00', status: 'Cancelled' },
  ];

  const formatPrice = (price) => {
    return `₱ ${price.toFixed(2)}`;
  };

  const renderOrderItem = (order) => {
    if (activeTab === 'In Progress') {
      return (
        <View key={order.id} style={styles.orderItem}>
          <Image 
            source={{ uri: order.productImage }} 
            style={styles.itemImage}
            defaultSource={require('@/assets/images/splash.jpg')}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{order.productName}</Text>
            <Text style={styles.itemCount}>
              {order.quantity} {order.quantity === 1 ? 'item' : 'items'} • {formatPrice(order.totalAmount)}
            </Text>
            <Text style={styles.storeText}>{order.storeName}</Text>
          </View>
          {order.status !== 'in_progress' && (
          <View style={styles.quantityControls}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleDecrement(order)}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{order.quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleIncrement(order)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
        </View>
      );
    } else {
      // THIS IS TO CHANGE PAST ORDERS
      return (
        <View key={order.id} style={styles.orderItem}>
                    <Image 
            source={{ uri: order.productImage }} 
            style={styles.itemImage}
            defaultSource={require('@/assets/images/splash.jpg')}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{order.productName}</Text>
            <Text style={styles.itemCount}>
              {order.quantity} {order.quantity === 1 ? 'item' : 'items'} • {formatPrice(order.totalAmount)}
            </Text>
            <Text style={styles.storeText}>{order.storeName}</Text>
          </View>

          <View style={styles.itemInfo}>
          
            {order.status && <Text style={styles.itemStatus}>{order.status}</Text>}
          </View>
        </View>
      );
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#020452" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Error loading orders: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}
    refreshControl={
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        tintColor="#000"
        colors={['#000']}
      />
    }>

      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Your Orders</Text>
          <Text style={styles.headerSubtitle}>Wait for the best meal</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('In Progress')}
        >
          <Text style={[styles.tabText, activeTab === 'In Progress' && styles.activeTabText]}>
            In Progress
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('Past Orders')}
        >
          <Text style={[styles.tabText, activeTab === 'Past Orders' && styles.activeTabText]}>
            Past Orders
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.indicatorContainer}>
        <View style={styles.grayLine} />
        <Animated.View
          style={[
            styles.indicator,
            {
              width: scale(35),
              transform: [{ translateX: indicatorPosition }],
            },
          ]}
        />
      </View>
          {/* here */}
      <View style={styles.ordersContainer}>
        {activeTab === 'In Progress' 
          ? orders.map(order => renderOrderItem(order))
          : finishedorders.map(order => renderOrderItem(order))}
      </View>


      {deliveryMessage && (
  <View style={styles.messageContainer}>
    <Ionicons name="checkmark-circle" size={24} color="white" />
    <Text style={styles.deliveryMessage}>{deliveryMessage}</Text>
  </View>
)}   

 {showEmptyState() && (
        <>
          <View style={styles.container1}>
            <Image
              source={require('@/assets/images/burger.png')}
              style={styles.image1}
            />
          </View>
          <Text style={styles.title1}>Ouch! Hungry</Text>
          <Text style={styles.description1}>
            Seems like you have not ordered any food yet
          </Text>
          <View style={styles.buttonContainer1}>
            <TouchableOpacity href="/tabs/" style={[styles.button1, styles.grayButton1]}>
              <Text style={styles.buttonText1}>Find Foods</Text>
            </TouchableOpacity>
          </View>
        </>
      )}


      {activeTab === 'In Progress' && orders.length > 0 && (
        <TouchableOpacity 
        style={styles.reviewButton}
        onPress={handleReviewPayment}
        disabled={orders.some(order => order.status === 'in_progress')}
      >
        <Text style={styles.buttonText}>
          {getButtonText(orders, deliveryTime)}
        </Text>
      </TouchableOpacity> 
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#4CAF50',
    padding: moderateScale(16),
    marginHorizontal: moderateScale(16),
    marginTop: verticalScale(16),
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#43A047',
  },
  
  deliveryMessage: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(16),
    textAlign: 'center',
    letterSpacing: 0.3,
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(8),
  },
  quantityButton: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(4),
  },
  quantityButtonText: {
    fontSize: moderateScale(16),
    color: '#000',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-Medium',
    marginHorizontal: moderateScale(8),
    minWidth: moderateScale(20),
    textAlign: 'center',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    backgroundColor: '#fff',
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemDetails: {
    flex: 1,
    marginRight: moderateScale(8),
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: moderateScale(20),
    paddingVertical: moderateScale(24),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  backButton: {
    marginRight: scale(8),
  },
  backButtonContainer: {
    backgroundColor: '#020452',
    width: scale(25),
    height: scale(25),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  headerTextContainer: {
    marginLeft: scale(4),
  },
  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  headerSubtitle: {
    fontSize: moderateScale(14),
    color: '#8D92A3',
    fontFamily: 'Poppins-Regular',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(16),
  },
  tabItem: {
    width: 100, 
    alignItems: 'center',
    marginRight: scale(18), 
  },
  tabText: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  activeTabText: {
    color: '#000',
  },
  indicatorContainer: {
    height: verticalScale(2),
    width: '100%',
    position: 'relative',
    alignItems: 'flex-start',
    marginTop: -verticalScale(4), 
    marginBottom: verticalScale(16),
  },
  grayLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: verticalScale(1),
    backgroundColor: '#ccc',
  },
  indicator: {
    height: verticalScale(3),
    backgroundColor: '#000',
    borderRadius: moderateScale(1),
    position: 'absolute',
    bottom: 0,
  },
  ordersContainer: {
    marginTop: verticalScale(16),
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  itemImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(8),
    marginRight: moderateScale(12),
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-Medium',
    marginBottom: verticalScale(4),
  },
  itemCount: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  itemInfo: {
    alignItems: 'flex-end',
  },
  itemDate: {
    fontSize: moderateScale(12),
    color: '#8D92A3',
  },
  itemStatus: {
    fontSize: moderateScale(12),
    color: 'red',
    marginTop: verticalScale(4),
  },
  reviewButton: {
    backgroundColor: '#000',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: verticalScale(20),
    alignSelf: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-Medium',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',  // Vertically center
    alignItems: 'center',      // Horizontally center
    backgroundColor:'#fff',
  },
  image1: {
    marginTop: verticalScale(-70),
    transform: [{ scale: 0.7 }],
    
  },
  title1: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(18),
    marginBottom: verticalScale(-5),
    marginTop:verticalScale(-30),
    textAlign: 'center',
  },
  description1: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginVertical: verticalScale(10),
    color: '#666',
    marginHorizontal:moderateScale(55)

  },
  buttonContainer1: {
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: verticalScale(20),
    width: '100%',
  },
  button1: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center', 
    width: '65%', 
    marginBottom: verticalScale(10),
  },
  grayButton1: {
    backgroundColor: '#020452',
  },
  buttonText1: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(14),
    color: '#fff',
  },
});

export default OrdersScreen;
