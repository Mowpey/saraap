import { View, StyleSheet, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import splashImage from "@/assets/images/splash.jpg";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/signin");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaProvider style={styles.safeAreaProviderStyle}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.splashContainer}>
          <Image source={splashImage} style={styles.imageStyle} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaProviderStyle: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
  },
  safeAreaContainer: {
    alignItems: "center",
  },
  splashContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  imageStyle: {
    aspectRatio: 1,
    width: 350,
    height: 350,
  },
});

export default SplashScreen;
