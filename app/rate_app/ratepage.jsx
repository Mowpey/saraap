import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import rateImage from "@/assets/images/rate-image.png";
import StarRating from "./star-rating";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCustomFonts } from "@/utils/fonts";

const RatePage = () => {
  const [rating, setRating] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const fontsLoaded = useCustomFonts();

  {
    !fontsLoaded && null;
  }

  const handleSubmit = () => {
    setShowDialog(true);
  };

  const handleBack = () => {
    router.push("/tabs/profile");
  };
  const handleConfirm = () => {
    setShowDialog(false);
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
          <Text style={styles.headerText}>Rate Our App</Text>
        </View>
        <View style={styles.mainContainerStyle}>
          <Image source={rateImage} style={{ width: 300, height: 300 }} />
          <Text style={styles.mainTextStyle}>
            How Would You Rate Our App Experience?
          </Text>
          <StarRating rating={rating} onRatingChange={setRating} />
        </View>
        <View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitButtonStyle}
          >
            <Text style={styles.submitTextStyle}>Submit Your Rating</Text>
          </TouchableOpacity>
        </View>
        <AlertDialog open={showDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Thank You for Your Rating!</AlertDialogTitle>
              <AlertDialogDescription>
                We appreciate your feedback. Your {rating}-star rating helps us
                improve our app experience.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleConfirm}>
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RatePage;

const styles = StyleSheet.create({
  safeAreaContainer: {
    padding: 25,
    gap: 70,
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
  mainContainerStyle: {
    alignItems: "center",
    gap: 20,
    marginBlock: 15,
  },
  mainTextStyle: {
    fontFamily: "Poppins-Medium",
    fontSize: 25,
    textAlign: "center",
  },
  submitButtonStyle: {
    padding: 15,
    backgroundColor: "#020452",
    alignItems: "center",
    marginInline: 20,
    borderRadius: 15,
  },
  submitTextStyle: {
    fontFamily: "Poppins-Medium",
    color: "white",
    fontSize: 20,
  },
});
