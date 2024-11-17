import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Link, router } from "expo-router";
import backArrow from "@/assets/images/arrow-back.png";
import profilePicture from "@/assets/images/profile.png";
import * as ImagePicker from "expo-image-picker";

const SignUpScreen = () => {
  const [customFonts] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Thin": require("@/assets/fonts/Poppins-Thin.ttf"),
  });

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameIsFocused, setFullNameToFocused] = useState(false);
  const [emailIsFocused, setEmailToFocused] = useState(false);
  const [passwordIsFocused, setPasswordToFocused] = useState(false);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [emailError, setEmailError] = useState(false);

  const exampleEmails = [
    "markangelo@gmail.com",
    "ken@gmail.com",
    "louie@gmail.com",
  ];

  const emailValidator = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailAddress == "") {
      setEmailError(false);
      router.push("/address");
    } else if (exampleEmails.includes(emailAddress)) {
      setEmailError(true);
    } else if (!emailRegex.test(emailAddress)) {
      setEmailError(true);
    } else {
      setEmailError(false);
      router.push("/address");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedProfilePicture(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        {/*  Sign Up Icon and Text Description */}
        <View style={styles.upperSignUpContainer}>
          <View>
            <Link href={"/signin"}>
              <Image
                source={backArrow}
                style={{ width: 35, height: 35 }}
              ></Image>
            </Link>
          </View>
          <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpTextStyle}>Sign Up</Text>
            <Text style={styles.signUpTextDescStyle}>Register and eat</Text>
          </View>
        </View>
        {/*  Sign Up Icon and Text Description  END*/}

        <Pressable onPress={pickImage}>
          <View style={styles.profilePictureContainer}>
            <Image
              source={
                selectedProfilePicture
                  ? { uri: selectedProfilePicture }
                  : profilePicture
              }
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </View>
        </Pressable>

        <View>
          <Text style={styles.formTitleStyle}>Full Name</Text>
          <TextInput
            onChangeText={setFullName}
            value={fullName}
            placeholder="Type your full name"
            autoCapitalize="none"
            placeholderTextColor={"gray"}
            style={[
              styles.formInputStyle,
              fullNameIsFocused && styles.fullNameIsFocusedStyle,
            ]}
            onFocus={() => setFullNameToFocused(true)}
            onBlur={() => setFullNameToFocused(false)}
          />

          <Text style={styles.formTitleStyle}>Email Address</Text>
          <TextInput
            onChangeText={setEmailAddress}
            value={emailAddress}
            placeholder="Type your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={"gray"}
            style={[
              styles.formInputStyle,
              styles.emailIsFocusedStyle,
              {
                borderColor: emailIsFocused
                  ? emailError
                    ? "#ef4444"
                    : "#7aeb34"
                  : emailError
                  ? "#ef4444"
                  : "#cfcfcf",
              },
            ]}
            onFocus={() => setEmailToFocused(true)}
            onBlur={() => setEmailToFocused(false)}
          />
          {emailError && (
            <Text style={styles.emailErrorStyle}>
              Email is invalid or already registered!
            </Text>
          )}

          <Text style={styles.formTitleStyle}>Password</Text>
          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="Type your password"
            autoCapitalize="none"
            placeholderTextColor={"gray"}
            secureTextEntry={true}
            style={[
              styles.formInputStyle,
              passwordIsFocused && styles.passwordIsFocusedStyle,
            ]}
            onFocus={() => setPasswordToFocused(true)}
            onBlur={() => setPasswordToFocused(false)}
          />

          <Pressable
            onPress={emailValidator}
            style={styles.continueButtonStyle}
          >
            <Text style={styles.continueTextStyle}>Continue</Text>
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
  upperSignUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginVertical: 20,
  },
  signUpTextContainer: {
    gap: 5,
  },
  signUpTextStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
  },
  signUpTextDescStyle: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
    color: "gray",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginVertical: 30,
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    alignSelf: "center",
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
  continueButtonStyle: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#020452",
    marginVertical: 10,
  },
  continueTextStyle: {
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
  fullNameIsFocusedStyle: {
    borderWidth: 2,
    borderColor: "#7aeb34",
    outlineStyle: "none",
  },
  emailIsFocusedStyle: {
    borderWidth: 2,
    outlineStyle: "none",
  },
  passwordIsFocusedStyle: {
    borderWidth: 2,
    borderColor: "#7aeb34",
    outlineStyle: "none",
  },
  emailErrorStyle: {
    color: "#ef4444",
    fontSize: 15,
    marginVertical: 4,
    marginHorizontal: 5,
    fontFamily: "Poppins-Regular",
  },
});

export default SignUpScreen;
