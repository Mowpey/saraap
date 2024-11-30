import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Link } from "expo-router";

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('In Progress');
  const indicatorPosition = useRef(new Animated.Value(0)).current; 
  const tabWidth = 150; 
  const indicatorWidth = scale(35); 

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
  });

  // Slide the indicator when the tab changes
  useEffect(() => {
    const toValue = activeTab === 'In Progress' ? 30 : tabWidth;
    Animated.timing(indicatorPosition, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  const inProgressOrders = [
    { id: 1, title: 'Avocado', count: '3 items • ₱ 60', image: require('@/assets/images/avocado.jpg') },
    { id: 2, title: 'Kopiko', count: '10 items • ₱ 50', image: require('@/assets/images/kopiko.jpg') },
        { id: 3, title: 'Sprinkle', count: '2 items • ₱ 50', image: require('@/assets/images/sprinkle.jpg') },
    { id: 4, title: 'Bawang', count: '10 items • ₱ 100', image: require('@/assets/images/bawang.png') },
  ];

  const pastOrders = [
    { id: 1, title: 'Curry', count: '1 item • ₱ 99', image: require('@/assets/images/curry.jpg'), date: 'Nov 3', time: '14:00' },
    { id: 2, title: 'Avocado', count: '1 item • ₱ 60', image: require('@/assets/images/avocado.jpg'), date: 'Nov 3', time: '09:00', status: 'Cancelled' },
  ];

  const ordersToDisplay = activeTab === 'In Progress' ? inProgressOrders : pastOrders;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}


      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <View style={styles.backButtonContainer}>
            <Ionicons name="chevron-back" size={scale(15)} color="#ffffff" />
          </View>
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Your Orders</Text>
          <Text style={styles.headerSubtitle}>Wait for the best meal</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('In Progress')}
        >
          <Text style={[styles.tabText, activeTab === 'In Progress' && styles.activeTabText]}>In Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('Past Orders')}
        >
          <Text style={[styles.tabText, activeTab === 'Past Orders' && styles.activeTabText]}>Past Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Sliding Indicator */}
      <View style={styles.indicatorContainer}>
        <View style={styles.grayLine} />
        <Animated.View
          style={[
            styles.indicator,
            {
              width: indicatorWidth, 
              transform: [{ translateX: indicatorPosition }],
            },
          ]}
        />
      </View>

      {/* Orders */}
      <View style={styles.ordersContainer}>
        {ordersToDisplay.map(order => (
          <View key={order.id} style={styles.orderItem}>
            <Image source={order.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{order.title}</Text>
              <Text style={styles.itemCount}>{order.count}</Text>
            </View>
            {activeTab === 'Past Orders' && (
              <View style={styles.itemInfo}>
                <Text style={styles.itemDate}>{order.date}, {order.time}</Text>
                {order.status && <Text style={styles.itemStatus}>{order.status}</Text>}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: 'Poppins-Medium',
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
});

export default OrdersScreen;
