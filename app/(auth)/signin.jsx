import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  FacebookAuthProvider,
  getAuth 
} from 'firebase/auth';
import googleLogo from "@/assets/images/google.png";
import facebookLogo from "@/assets/images/facebook.png";
import { useFonts } from "expo-font";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const SignInScreen = () => {
  const [customFonts] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Thin": require("@/assets/fonts/Poppins-Thin.ttf"),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsFocused, setEmailToFocused] = useState(false);
  const [passwordIsFocused, setPasswordToFocused] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Incorrect email or password. Please try again.");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (inputText) => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|co|io|ai|uk|ca|de|fr|jp|au|[\w-]{2,})$/i;
    return emailRegex.test(inputText);
  };

  const handleSignIn = async () => {
    const isValid = validateEmail(email);
    if (!isValid) {
      setErrorMessage("Please enter a valid email address");
      setShowError(true);
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setShowError(false);
      router.push("/(auth)/registered");
    } catch (error) {
      setErrorMessage(
        error.code === 'auth/wrong-password' 
          ? 'Incorrect password. Please try again.' 
          : error.code === 'auth/user-not-found'
          ? 'No account found with this email.'
          : 'An error occurred. Please try again.'
      );
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      router.push("/tabs/");
    } catch (error) {
      setErrorMessage("Google sign-in failed. Please try again.");
      setShowError(true);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      router.push("/tabs/");
    } catch (error) {
      setErrorMessage("Facebook sign-in failed. Please try again.");
      setShowError(true);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.upperContainer}>
          <Text style={styles.signInStyle}>Sign In</Text>
          <Text style={styles.signInDesc}>Find your best ever meal</Text>
        </View>
        <View style={styles.FormContainerStyle}>
          {showError && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
          <Text style={styles.formTitleStyle}>Email Address</Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="Type your email address"
            placeholderTextColor={"gray"}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            style={[
              styles.formInputStyle,
              emailIsFocused && styles.formIsActive,
            ]}
            onFocus={() => setEmailToFocused(true)}
            onBlur={() => setEmailToFocused(false)}
          />

          <Text style={styles.formTitleStyle}>Password</Text>
          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="Type your password"
            placeholderTextColor={"gray"}
            autoCapitalize="none"
            autoComplete="current-password"
            secureTextEntry={true}
            style={[
              styles.formInputStyle,
              passwordIsFocused && styles.formIsActive,
            ]}
            onFocus={() => setPasswordToFocused(true)}
            onBlur={() => setPasswordToFocused(false)}
          />
          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.signInButtonStyle, isLoading && styles.buttonDisabled]} 
              onPress={handleSignIn}
              disabled={isLoading}
            >
              <Text style={styles.signInTextStyle}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Text>
            </Pressable>
            <Link href="/signin" style={styles.forgotPasswordStyle}>
              Forgot Password
            </Link>
          </View>

          <View style={styles.alternativeSignInStyle}>
            <Text style={styles.continueWithStyle}>- OR Continue with -</Text>
            <View style={styles.alternativeAccountStyle}>
              <TouchableOpacity 
                style={styles.logoStyle}
                onPress={handleGoogleSignIn}
              >
                <Image
                  source={googleLogo}
                  style={{ width: 35, height: 35 }}
                ></Image>
                <Text style={styles.altAccountText}> Google </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.logoStyle}
                onPress={handleFacebookSignIn}
              >
                <Image
                  source={facebookLogo}
                  style={{ width: 35, height: 35 }}
                ></Image>
                <Text style={styles.altAccountText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.createAccountStyle}>
            <Text style={styles.createAccountTextStyle}>
              Create an Account{" "}
              <Link href={"/signup"} style={styles.createAccountLinkStyle}>
                Sign Up
              </Link>
            </Text>
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
  upperContainer: {
    gap: 2,
    marginVertical: 15,
  },
  signInStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
  },
  signInDesc: {
    fontFamily: "Poppins-Light",
    color: "gray",
    fontSize: 15,
  },
  FormContainerStyle: {
    marginTop: 50,
  },
  formTitleStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    marginTop: 10,
  },
  formInputStyle: {
    marginVertical: 10,
    height: 45,
    borderRadius: 10,
    borderColor: "#cfcfcf",
    borderWidth: 2,
    padding: 10,
    outlineStyle: "none",
  },
  formIsActive: {
    borderWidth: 2,
    borderColor: "blue",
  },
  buttonContainer: {
    marginVertical: 10,
    justifyContent: "center",
  },
  signInButtonStyle: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#020452",
  },
  signInTextStyle: {
    color: "white",
    fontSize: 17,
    fontFamily: "Poppins-Regular",
  },
  forgotPasswordStyle: {
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
    textDecorationLine: "underline",
    color: "red",
  },
  alternativeSignInStyle: {
    alignItems: "center",
  },
  alternativeAccountStyle: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 25,
  },
  logoStyle: {
    flex: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 35,
    borderCurve: "continuous",
    backgroundColor: "rgba(235, 0, 41, 0.1)",
  },
  altAccountText: {
    fontFamily: "Poppins-Regular",
    color: "#575757",
  },
  continueWithStyle: {
    fontFamily: "Poppins-Light",
    color: "#6b6b6b",
  },
  createAccountStyle: {
    alignItems: "center",
  },
  createAccountTextStyle: {
    fontFamily: "Poppins-Light",
    color: "#575757",
    fontSize: 16,
  },
  createAccountLinkStyle: {
    marginLeft: 5,
    fontFamily: "Poppins-Medium",
    color: "#130E40",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 15,
    marginVertical: 4,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#f7c8dd",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
    backgroundColor: "#666",
  },
});

export default SignInScreen;