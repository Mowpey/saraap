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
import { Link, useLocalSearchParams } from 'expo-router';
import { collection, query, where, getDocs,doc,updateDoc, } from 'firebase/firestore';
import { db } from "services/FirebaseConfig.ts";

const PaymentScreen = () => {
  const [addressDetails, setAddressDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get params from previous screen
  const params = useLocalSearchParams();
  const { 
    userId, 
    totalAmount, 
    orderCount, 
    storeName, 
    customerName 
  } = params;

  // Fetch address details from Firestore
  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const addressesRef = collection(db, 'addresses');
        const q = query(addressesRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // Get the first document and its data
          const addressData = querySnapshot.docs[0].data();
          
          // Access the fullName field
          const fullName = addressData.fullName;
          
          console.log('Full Name:', fullName);
          setAddressDetails(addressData); // Store the entire address data if needed
        } else {
          console.log('No address found for user:', userId);
          setError('No address found');
        }
      } catch (err) {
        console.error('Error fetching address:', err);
        setError('Error loading address details');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAddressDetails();
    }
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

  // Calculate tax (10% of total amount)
  const taxAmount = parseFloat(totalAmount) * 0.10;

  const orderDetails = {
    name: storeName || "Store Name",
    price: `₱ ${parseFloat(totalAmount).toFixed(2)}`,
    items: orderCount || 0,
    transactionId: `#${Date.now().toString().slice(-8)}`,
    driverId: "#202401",
    tax: `₱ ${taxAmount.toFixed(2)}`,
    totalPrice: `₱ ${(parseFloat(totalAmount) + taxAmount).toFixed(2)}`,
    delivery: {
      name: addressDetails.fullName || "Customer Name",
      phone: addressDetails?.phoneNumber || "No phone number",
      address: addressDetails?.address || "No address",
      houseNo: addressDetails?.houseNumber || "No house number",
      city: addressDetails?.city || "No city"
    }
  };

  const DetailRow = ({ label, value, isGreen }) => (
    <View style={styles.detailRow}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={[styles.valueText, isGreen && styles.greenText]}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
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
    orderDetails.name === "Jollibee"
      ? { uri: "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Jollibee_2011_logo.svg/1200px-Jollibee_2011_logo.svg.png" }
      : orderDetails.name === "Chowking"
      ? { uri: "https://icon2.cleanpng.com/20180524/ayu/avqrcepm3.webp" } 
      : orderDetails.name === "McDonalds"
      ? { uri: "https://www.negros-occ.gov.ph/wp-content/uploads/2023/04/McDonalds-logo.png" } 
      : require('@/assets/images/splash.jpg') 
  }
  style={styles.foodImage}
  resizeMode="cover"
/>
            <View style={styles.orderItemDetails}>
              <Text style={styles.itemName}>{orderDetails.name}</Text>
              <Text style={styles.itemPrice}>{orderDetails.price}</Text>
            </View>
            <Text style={styles.itemCount}>{orderDetails.items} items</Text>
          </View>

          <Text style={styles.sectionTitle}>Details Transaction</Text>
          <DetailRow label={storeName} value={orderDetails.transactionId} />
          <DetailRow label="Driver" value={orderDetails.driverId} />
          <DetailRow label="Tax 10%" value={orderDetails.tax} />
          <DetailRow label="Total Price" value={orderDetails.totalPrice} isGreen />

          <Text style={styles.sectionTitle}>Deliver to:</Text>
          <DetailRow label="Name" value={orderDetails.delivery.name} />
          <DetailRow label="Phone No." value={orderDetails.delivery.phone} />
          <DetailRow label="Address" value={orderDetails.delivery.address} />
          <DetailRow label="House No." value={orderDetails.delivery.houseNo} />
          <DetailRow label="City" value={orderDetails.delivery.city} />

          <TouchableOpacity
          href="/screen/payment_order/success_order"
  style={styles.checkoutButton}
  onPress={async () => {
    try {
      setLoading(true);

      // Query to find all documents in the "in_progress" collection by userId
      const inProgressRef = collection(db, 'in_progress');
      const q = query(inProgressRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Loop through each document and update its "status" field
        const updatePromises = querySnapshot.docs.map((doc) => {
          const docRef = doc.ref;
          return updateDoc(docRef, { status: 'in_progress' });
        });

        // Wait for all updates to complete
        await Promise.all(updatePromises);

        console.log('All orders updated to "in_progress"');
        Alert.alert('Success', 'All your orders are now in progress!');
      } else {
        console.log('No in_progress documents found for user:', userId);
        Alert.alert('Error', 'No orders found to update.');
      }
    } catch (err) {
      console.error('Error updating statuses:', err);
      Alert.alert('Error', 'Failed to update the order statuses.');
    } finally {
      setLoading(false);
    }
  }}
>
  <Text style={styles.checkoutButtonText}>
    {loading ? 'Processing...' : 'Checkout Now'}
  </Text>
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
    marginRight:scale(16)
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
};

export default PaymentScreen;
