import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const PaymentScreen = () => {
  const [customFonts] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
  });

  if (!customFonts) {
    return null; 
  }

  const orderDetails = {
    name: "Cherry Healthy",
    price: "IDR 289.000",
    items: 14,
    transactionId: "0000000",
    driverId: "000000",
    tax: "0000000",
    totalPrice: "000000000",
    delivery: {
      name: "Ken Robbie Galapate",
      phone: "0929 0819 9688",
      address: "Sa Kanto",
      houseNo: "Nasa",
      city: "Tugue"
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
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <View style={styles.backButtonContainer}>
            <Ionicons name="chevron-back" size={scale(15)} color="#ffffff" />
          </View>
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Payment</Text>
          <Text style={styles.headerSubtitle}>You deserve better meal</Text>
        </View>
      </View>


      <Text style={styles.sectionTitle}>Item Ordered</Text>
      <View style={styles.orderItem}>
        <Image
          source={require('@/assets/images/foods.jpg')}
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
      <DetailRow label="Cherry Healthy" value={orderDetails.transactionId} />
      <DetailRow label="Driver" value={orderDetails.driverId} />
      <DetailRow label="Tax 10%" value={orderDetails.tax} />
      <DetailRow label="Total Price" value={orderDetails.totalPrice} isGreen />


      <Text style={styles.sectionTitle}>Deliver to:</Text>
      <DetailRow label="Name" value={orderDetails.delivery.name} />
      <DetailRow label="Phone No." value={orderDetails.delivery.phone} />
      <DetailRow label="Address" value={orderDetails.delivery.address} />
      <DetailRow label="House No." value={orderDetails.delivery.houseNo} />
      <DetailRow label="City" value={orderDetails.delivery.city} />

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout Now</Text>
      </TouchableOpacity>
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
    fontFamily: 'Poppins-Medium',
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
