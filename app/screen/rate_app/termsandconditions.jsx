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

const TermsAndConditions = () => {
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
          <Text style={styles.headerText}>Terms & Conditions</Text>
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
              <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
              <Text style={styles.bodyText}>
                By accessing and using our application, you acknowledge that you
                have read, understood, and agree to be bound by these Terms and
                Conditions. If you do not agree to these terms, please do not
                use our application.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. User Registration</Text>
              <Text style={styles.bodyText}>
                To use certain features of our application, you may be required
                to register for an account. You agree to:
                {"\n"}- Provide accurate and complete information
                {"\n"}- Maintain the security of your account credentials
                {"\n"}- Promptly update your account information
                {"\n"}- Accept responsibility for all activities under your
                account
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. User Conduct</Text>
              <Text style={styles.bodyText}>
                You agree not to:
                {"\n"}- Violate any applicable laws or regulations
                {"\n"}- Infringe upon intellectual property rights
                {"\n"}- Upload harmful content or malware
                {"\n"}- Attempt to gain unauthorized access
                {"\n"}- Use the service for any illegal purposes
                {"\n"}- Harass, abuse, or harm others
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Intellectual Property</Text>
              <Text style={styles.bodyText}>
                All content, features, and functionality of our application,
                including but not limited to text, graphics, logos, icons,
                images, audio clips, digital downloads, and software, are the
                exclusive property of our company and protected by international
                copyright, trademark, and other intellectual property laws.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Service Modifications</Text>
              <Text style={styles.bodyText}>
                We reserve the right to:
                {"\n"}- Modify or discontinue any part of our service
                {"\n"}- Update these terms at any time
                {"\n"}- Change our pricing with appropriate notice
                {"\n"}- Limit service availability by region
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                6. Limitation of Liability
              </Text>
              <Text style={styles.bodyText}>
                Our application is provided "as is" without warranties of any
                kind. We shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your
                use or inability to use the service.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Termination</Text>
              <Text style={styles.bodyText}>
                We may terminate or suspend your account and access to our
                service immediately, without prior notice, for conduct that we
                believe violates these Terms and Conditions or is harmful to
                other users, us, or third parties, or for any other reason at
                our sole discretion.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Governing Law</Text>
              <Text style={styles.bodyText}>
                These terms shall be governed by and construed in accordance
                with the laws of Tuguegarao City, without regard to its conflict
                of law provisions.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>9. Contact Information</Text>
              <Text style={styles.bodyText}>
                For any questions regarding these Terms and Conditions, please
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

export default TermsAndConditions;

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
