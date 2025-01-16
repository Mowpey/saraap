import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import callSupportImage from "@/assets/images/call-support.png";
import chatSupportImage from "@/assets/images/chat-support.png";
import readFAQImage from "@/assets/images/read-faqs.png";
import { useRouter } from "expo-router";
import { useCustomFonts } from "@/utils/fonts";
import { Ionicons } from "@expo/vector-icons";

const HelpCenter = () => {
  const router = useRouter();
  const fontsLoaded = useCustomFonts();
  const handleBack = () => {
    router.push("/tabs/profile");
  };

  {
    !fontsLoaded && null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.headerButtonStyle}
            >
              <Ionicons
                name="chevron-back"
                style={{ color: "white", fontSize: 20 }}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Help Center</Text>
          </View>
          <View style={styles.helpDescriptionContainer}>
            <Text style={styles.helpDescText}>Hi! How can we help you?</Text>
            <Text style={styles.helpDescSubText}>
              Find support articles, setup guides, troubleshooting tips, FAQs,
              and more
            </Text>
          </View>
          <View style={{ gap: 25 }}>
            <TouchableOpacity style={styles.supportPressableContainer}>
              <Image
                source={callSupportImage}
                style={{ width: 150, height: 150 }}
              />
              <Text style={styles.helpTextStyle}>Call Us</Text>
              <Text style={styles.helpTextStyle}>1-457-581-4610</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportPressableContainer}>
              <Image
                source={chatSupportImage}
                style={{ width: 150, height: 150 }}
              />
              <Text style={styles.helpTextStyle}>Chat our support team</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportPressableContainer}>
              <Image
                source={readFAQImage}
                style={{ width: 150, height: 150 }}
              />
              <Text style={styles.helpTextStyle}>
                Read Frequently Asked Questions
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  safeAreaContainer: {
    padding: 25,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerButtonStyle: {
    padding: 10,
    backgroundColor: "#020452",
    borderRadius: 30,
  },
  headerText: {
    fontFamily: "Poppins-Medium",
    fontSize: 25,
  },
  helpDescriptionContainer: {
    alignItems: "center",
    gap: 15,
    marginBlock: 30,
  },
  helpDescText: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 25,
  },
  helpDescSubText: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 15,
  },
  supportPressableContainer: {
    alignItems: "center",
    gap: 10,
    borderColor: "#c8cacc",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
  },
  helpTextStyle: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
  },
});
