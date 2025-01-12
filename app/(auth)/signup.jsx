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
import { useCustomFonts } from "@/utils/fonts";
import { Link, router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import backArrow from "@/assets/images/arrow-back.png";

const auth = getAuth();

const SignUpScreen = () => {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameIsFocused, setFullNameToFocused] = useState(false);
  const [emailIsFocused, setEmailToFocused] = useState(false);
  const [passwordIsFocused, setPasswordToFocused] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    let isValid = true;
    setNameEmpty(false);
    setPasswordEmpty(false);
    setEmailError(false);
    setErrorMessage("");

    if (fullName.trim() === "") {
      setNameEmpty(true);
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordEmpty(true);
      isValid = false;
    } else if (password.length < 6) {
      setPasswordEmpty(true);
      setErrorMessage("Password must be at least 6 characters long");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailAddress === "" || !emailRegex.test(emailAddress)) {
      setEmailError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailAddress, password);
      const userId = userCredential.user.uid;
      
      // Navigate to address screen with user data
      router.push({
        pathname: "/address",
        params: { 
          userId,
          fullName,
          email: emailAddress
        }
      });
    } catch (error) {
      setErrorMessage(
        error.code === 'auth/email-already-in-use'
          ? 'This email is already registered. Please use a different email.'
          : 'An error occurred during signup. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.upperSignUpContainer}>
          <View>
            <Link href={"/signin"}>
              <Image source={backArrow} style={{ width: 35, height: 35 }} />
            </Link>
          </View>
          <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpTextStyle}>Sign Up</Text>
            <Text style={styles.signUpTextDescStyle}>Register and eat</Text>
          </View>
        </View>

        <View>
          {errorMessage !== "" && (
            <Text style={styles.formErrorStyle}>{errorMessage}</Text>
          )}

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
              {
                borderColor: fullNameIsFocused
                  ? nameEmpty
                    ? "#ef4444"
                    : "#7aeb34"
                  : nameEmpty
                  ? "#ef4444"
                  : "#cfcfcf",
              },
            ]}
            onFocus={() => setFullNameToFocused(true)}
            onBlur={() => setFullNameToFocused(false)}
          />
          {nameEmpty && (
            <Text style={styles.formErrorStyle}>Name cannot be left empty!</Text>
          )}

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
            <Text style={styles.formErrorStyle}>
              Please enter a valid email address.
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
              {
                borderColor: passwordIsFocused
                  ? passwordEmpty
                    ? "#ef4444"
                    : "#7aeb34"
                  : passwordEmpty
                  ? "#ef4444"
                  : "#cfcfcf",
              },
            ]}
            onFocus={() => setPasswordToFocused(true)}
            onBlur={() => setPasswordToFocused(false)}
          />
          {passwordEmpty && (
            <Text style={styles.formErrorStyle}>
              {errorMessage || "Password cannot be left empty!"}
            </Text>
          )}

          <Pressable 
            onPress={handleSignUp} 
            style={[styles.continueButtonStyle, isLoading && styles.buttonDisabled]}
            disabled={isLoading}
          >
            <Text style={styles.continueTextStyle}>
              {isLoading ? "Creating Account..." : "Continue"}
            </Text>
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
  buttonDisabled: {
    opacity: 0.7,
    backgroundColor: "#666",
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
  formErrorStyle: {
    color: "#ef4444",
    fontSize: 15,
    marginVertical: 4,
    marginHorizontal: 5,
    fontFamily: "Poppins-Regular",
  },
});

export default SignUpScreen;