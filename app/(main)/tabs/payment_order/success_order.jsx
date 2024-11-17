import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale,horizontalScale } from 'react-native-size-matters';
import { useFonts } from 'expo-font';

const PaymentScreen = () => {
  const [customFonts] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
  });

  if (!customFonts) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/deliverymotor.png')}
        style={styles.image}
      />
      <Text style={styles.title}>You've Made Order</Text>
      <Text style={styles.description}>
        Just stay at home while we are preparing your best foods
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.grayButton]}>
          <Text style={styles.buttonText}>Order Other Foods</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.purpleButton]}>
          <Text style={styles.buttonTextPurp}>View My Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: scale(20),
  },
  image: {
    marginTop:verticalScale(-70),
    transform: [{ scale: 0.7 }],
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(18),
    marginBottom: verticalScale(-5),
    marginTop:verticalScale(-30)
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginVertical: verticalScale(10),
    color: '#666',
    marginHorizontal:moderateScale(15)

  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: verticalScale(20),
    width: '100%',
  },
  button: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center', 
    width: '65%', 
    marginBottom: verticalScale(10),
  },
  grayButton: {
    backgroundColor: '#020452',
  },
  purpleButton: {
    backgroundColor: '#fff',
    borderColor:'#6c63ff',
    borderWidth:1,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(14),
    color: '#fff',
  },
  buttonTextPurp: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(14),
    color: '#6c63ff',
  },
});

export default PaymentScreen;