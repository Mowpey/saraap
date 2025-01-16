import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCustomFonts } from "@/utils/fonts";

const PrivacyPolicy = () => {
  const router = useRouter();
  const fontsLoaded = useCustomFonts();

  {
    !fontsLoaded && null;
  }

  const handleBack = () => {
    router.push("/tabs/profile");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
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
          <Text style={styles.headerText}>Privacy Policy</Text>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.lastUpdated}>
              Last Updated: January 16, 2025
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Information We Collect</Text>
              <Text style={styles.bodyText}>
                We collect information that you provide directly to us,
                including:
                {"\n"}- Personal information (name, email address, phone number)
                {"\n"}- Account credentials
                {"\n"}- Communication preferences
                {"\n"}- Device information and usage data
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                2. How We Use Your Information
              </Text>
              <Text style={styles.bodyText}>
                We use the collected information to:
                {"\n"}- Provide and maintain our services
                {"\n"}- Send you important notifications
                {"\n"}- Improve our app and user experience
                {"\n"}- Respond to your requests and support needs
                {"\n"}- Detect and prevent fraudulent activity
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Information Sharing</Text>
              <Text style={styles.bodyText}>
                We may share your information with:
                {"\n"}- Service providers who assist in our operations
                {"\n"}- Law enforcement when required by law
                {"\n"}- Business partners with your consent
                {"\n"}
                {"\n"}We do not sell your personal information to third parties.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Data Security</Text>
              <Text style={styles.bodyText}>
                We implement appropriate technical and organizational measures
                to protect your personal information. However, no method of
                transmission over the internet is 100% secure. We strive to
                protect your data but cannot guarantee absolute security.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Your Rights</Text>
              <Text style={styles.bodyText}>
                You have the right to:
                {"\n"}- Access your personal data
                {"\n"}- Correct inaccurate data
                {"\n"}- Request deletion of your data
                {"\n"}- Opt-out of marketing communications
                {"\n"}- Export your data
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
              <Text style={styles.bodyText}>
                Our services are not intended for children under 13. We do not
                knowingly collect personal information from children under 13.
                If you believe we have collected information from a child under
                13, please contact us.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                7. Changes to Privacy Policy
              </Text>
              <Text style={styles.bodyText}>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last Updated" date.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Contact Us</Text>
              <Text style={styles.bodyText}>
                If you have any questions about this Privacy Policy, please
                contact us at:
                {"\n"}
                {"\n"}Email: saraap@foods.com
                {"\n"}Phone: 1-457-581-4610
                {"\n"}Address: Palm Avenue Carig Sur, Tuguegarao City, Cagayan
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 25,
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
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 25,
  },
  lastUpdated: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    marginBottom: 12,
    color: "#020452",
  },
  bodyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    lineHeight: 24,
    color: "#333",
  },
});
