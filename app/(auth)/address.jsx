import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { useCustomFonts } from "@/utils/fonts";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import backArrow from "@/assets/images/arrow-back.png";
import { Dropdown } from "react-native-element-dropdown";

const AddressScreen = () => {
  const fontsLoaded = useCustomFonts();

  {
    !fontsLoaded && null;
  }
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const [phoneNumberIsFocused, setPhoneNumberToFocused] = useState(false);
  const [addressIsFocused, setAddressToFocused] = useState(false);
  const [houseNumberIsFocused, setHouseNumberToFocused] = useState(false);
  const [cityIsFocused, setCityToFocused] = useState(false);

  const [city, setCity] = useState(null);
  const cities = [{ label: "Tuguegarao City", value: "Tuguegarao City" }];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.upperAddressContainer}>
          <View>
            <Link href={"/signup"}>
              <Image
                source={backArrow}
                style={{ width: 35, height: 35 }}
              ></Image>
            </Link>
          </View>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressTextStyle}>Address</Text>
            <Text style={styles.addressDescStyle}>Make sure it's valid</Text>
          </View>
        </View>

        <View>
          <Text style={styles.formTitleStyle}>Phone No.</Text>
          <TextInput
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="Type your phone number"
            placeholderTextColor={"gray"}
            keyboardType="phone-pad"
            style={[
              styles.formInputStyle,
              phoneNumberIsFocused && styles.focusedInput,
            ]}
            onFocus={() => setPhoneNumberToFocused(true)}
            onBlur={() => setPhoneNumberToFocused(false)}
          />

          <Text style={styles.formTitleStyle}>Address</Text>
          <TextInput
            onChangeText={setAddress}
            value={address}
            placeholder="Type your address"
            placeholderTextColor={"gray"}
            style={[
              styles.formInputStyle,
              addressIsFocused && styles.focusedInput,
            ]}
            onFocus={() => setAddressToFocused(true)}
            onBlur={() => setAddressToFocused(false)}
          />

          <Text style={styles.formTitleStyle}>House No.</Text>
          <TextInput
            onChangeText={setHouseNumber}
            value={houseNumber}
            placeholder="Type your house number"
            placeholderTextColor={"gray"}
            style={[
              styles.formInputStyle,
              houseNumberIsFocused && styles.focusedInput,
            ]}
            onFocus={() => setHouseNumberToFocused(true)}
            onBlur={() => setHouseNumberToFocused(false)}
          />

          <Text style={styles.formTitleStyle}>City</Text>
          <Dropdown
            onChange={(item) => {
              setCity(item.value);
            }}
            data={cities}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select your city"
            placeholderStyle={{ color: "gray", fontSize: 14 }}
            value={city}
            style={[
              styles.formInputStyle,
              cityIsFocused && styles.focusedInput,
            ]}
            onFocus={() => setCityToFocused(true)}
            onBlur={() => setCityToFocused(false)}
          />

          <Pressable
            style={styles.signUpNowStyle}
            onPress={() => router.push("/registered")}
          >
            <Text style={styles.signUpNowTextStyle}>Sign Up Now</Text>
          </Pressable>

          <View style={styles.haveAccountContainer}>
            <Text style={styles.haveAccountTextStyle}>
              I Already Have an Account
            </Text>
            <Link href={"/signin"} style={styles.haveAccountLinkStyle}>
              {" "}
              Login
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    padding: 25,
    justifyContent: "flex-start",
  },
  upperAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginVertical: 20,
  },
  addressTextContainer: {
    gap: 5,
  },
  addressTextStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
  },
  addressDescStyle: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
    color: "gray",
  },

  formTitleStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
  formInputStyle: {
    marginVertical: 10,
    height: 45,
    borderRadius: 10,
    borderColor: "#cfcfcf",
    borderWidth: 2,
    padding: 10,
  },
  signUpNowStyle: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#020452",
    marginVertical: 10,
  },
  signUpNowTextStyle: {
    color: "white",
    fontSize: 17,
    fontFamily: "Poppins-Regular",
  },
  haveAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  haveAccountTextStyle: {
    fontFamily: "Poppins-Light",
    color: "#575757",
    fontSize: 16,
  },
  haveAccountLinkStyle: {
    marginLeft: 5,
    fontFamily: "Poppins-Medium",
    color: "#130E40",
    alignItems: "center",
    fontSize: 16,
  },
  focusedInput: {
    borderWidth: 2,
    outlineStyle: "none",
    borderColor: "#7aeb34",
  },
});

export default AddressScreen;
