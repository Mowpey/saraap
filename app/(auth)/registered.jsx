import React from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import completedPicture from "@/assets/images/completed.png";
import { useFonts } from "expo-font";

const RegisteredScreen = () => {
  const [customFonts] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Thin": require("@/assets/fonts/Poppins-Thin.ttf"),
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.middleContainer}>
          <Image source={completedPicture} />
          <View style={{ marginVertical: 30, gap: 5 }}>
            <Text style={styles.registeredTitle}>Yeay! Completed</Text>
            <Text style={styles.registeredDesc}>
              Now you are able to order {"\n"}some foods as a self-reward
            </Text>
            <Pressable
              onPress={() => router.push("/signin")}
              style={styles.findFoodContainer}
            >
              <Text style={styles.findFoodText}>Find Foods</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  middleContainer: {
    alignItems: "center",
  },
  registeredTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 25,
    textAlign: "center",
    color: "#020202",
  },
  registeredDesc: {
    fontFamily: "Poppins-Light",
    textAlign: "center",
    color: "#9c9992",
    fontSize: 16,
  },
  findFoodContainer: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#020452",
    marginTop: 35,
  },
  findFoodText: {
    color: "white",
    fontSize: 17,
    fontFamily: "Poppins-Regular",
  },
});

export default RegisteredScreen;
