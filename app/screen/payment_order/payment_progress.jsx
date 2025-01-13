import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "services/FirebaseConfig.ts";
import { getAuth } from "firebase/auth";

const PaymentScreen = () => {
  const [addressDetails, setAddressDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // Fetch both address and order details
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        // Fetch address details
        const addressesRef = collection(db, 'addresses');
        const addressQuery = query(addressesRef, where('userId', '==', userId));
        const addressSnapshot = await getDocs(addressQuery);

        // Fetch orders
        const ordersRef = collection(db, 'in_progress');
        const ordersQuery = query(ordersRef, where('userId', '==', userId));
        const ordersSnapshot = await getDocs(ordersQuery);

        if (!addressSnapshot.empty) {
          setAddressDetails(addressSnapshot.docs[0].data());
        }

        if (!ordersSnapshot.empty) {
          const orders = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          // Calculate totals
          const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
          const totalItems = orders.reduce((sum, order) => sum + order.quantity, 0);
          const storeName = orders[0]?.storeName || "Store Name"; // Take store name from first order

          setOrderDetails({
            storeName,
            totalAmount,
            totalItems,
            transactionId: `#${Date.now().toString().slice(-8)}`,
            driverId: "#202401",
            orderid: `#FM${Date.now().toString().slice(-6)}`,
            orderstatus: "In Progress"
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error loading details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const [customFonts] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
  });

  if (!customFonts) {
    return null;
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#020452" />
      </View>
    );
  }

  if (!orderDetails || !addressDetails) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>No order details found</Text>
      </View>
    );
  }

  // Calculate tax (10% of total amount)
  const taxAmount = orderDetails.totalAmount * 0.10;
  const totalWithTax = orderDetails.totalAmount + taxAmount;

  const DetailRow = ({ label, value, isGreen }) => (
    <View style={styles.detailRow}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={[styles.valueText, isGreen && styles.greenText]}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Link href="/tabs/order">
          <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
            <View style={styles.backButtonContainer}>
              <Ionicons name="chevron-back" size={scale(15)} color="#ffffff" />
            </View>
          </TouchableOpacity>
        </Link>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Payment</Text>
          <Text style={styles.headerSubtitle}>You deserve better meal</Text>
        </View>
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Item Ordered</Text>
          <View style={styles.orderItem}>
            <Image
              source={
                orderDetails.storeName === "Jollibee"
                  ? { uri: "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Jollibee_2011_logo.svg/1200px-Jollibee_2011_logo.svg.png" }
                  : orderDetails.storeName === "Chowking"
                  ? { uri: "https://example.com/mcdonalds-image.jpg" } 
                  : orderDetails.storeName === "McDonalds"
                  ? { uri: "https://www.negros-occ.gov.ph/wp-content/uploads/2023/04/McDonalds-logo.png" } 
                  : require('@/assets/images/splash.jpg') 
              }
              style={styles.foodImage}
              resizeMode="cover"
            />
            <View style={styles.orderItemDetails}>
              <Text style={styles.itemName}>{orderDetails.storeName}</Text>
              <Text style={styles.itemPrice}>₱ {orderDetails.totalAmount.toFixed(2)}</Text>
            </View>
            <Text style={styles.itemCount}>{orderDetails.totalItems} items</Text>
          </View>

          <Text style={styles.sectionTitle}>Details Transaction</Text>
          <DetailRow label={orderDetails.storeName} value={orderDetails.transactionId} />
          <DetailRow label="Driver" value={orderDetails.driverId} />
          <DetailRow label="Tax 10%" value={`₱ ${taxAmount.toFixed(2)}`} />
          <DetailRow label="Total Price" value={`₱ ${totalWithTax.toFixed(2)}`} isGreen />

          <Text style={styles.sectionTitle}>Deliver to:</Text>
          <DetailRow label="Name" value={addressDetails.fullName} />
          <DetailRow label="Phone No." value={addressDetails.phoneNumber} />
          <DetailRow label="Address" value={addressDetails.address} />
          <DetailRow label="House No." value={addressDetails.houseNumber} />
          <DetailRow label="City" value={addressDetails.city} />

          <Text style={styles.sectionTitle}>Order Status:</Text>
          <DetailRow label={orderDetails.orderid} value={orderDetails.orderstatus} isGreen />

          <TouchableOpacity
            href="/screen/payment_order/order_empty"
            style={styles.checkoutButton}
          >
            <Text style={styles.checkoutButtonText}>Cancel My Order</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: moderateScale(20),
    paddingVertical: moderateScale(24),
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginRight: scale(16)
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
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'medium',
    marginVertical: verticalScale(5),
    fontFamily: 'Poppins-Medium',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  foodImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    backgroundColor: '#f0f0f0',
    aspectRatio: 1,
  },
  orderItemDetails: {
    flex: 1,
    marginLeft: scale(12),
  },
  itemName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  itemPrice: {
    fontSize: moderateScale(13),
    color: '#8D92A3',
    fontFamily: 'Poppins-Regular',
  },
  itemCount: {
    fontSize: moderateScale(13),
    color: '#8D92A3',
    fontFamily: 'Poppins-Regular',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(3),
    paddingVertical: verticalScale(.5),
  },
  labelText: {
    fontSize: moderateScale(14),
    color: '#8D92A3',
    fontFamily: 'Poppins-Regular',
  },
  valueText: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular',
  },
  greenText: {
    color: '#00FF00',
  },
  checkoutButton: {
    backgroundColor: '#020452',
    padding: moderateScale(12),
    borderRadius: scale(8),
    alignItems: 'center',
    marginTop: verticalScale(24),
    marginBottom: verticalScale(16),
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
};

export default PaymentScreen;