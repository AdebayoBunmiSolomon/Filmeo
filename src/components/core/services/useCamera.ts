import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useImageStore } from "../store";

export const useCameraServices = () => {
  const [image, setImage] = useState<any>(null);
  const { setCapturedImage } = useImageStore();

  const openCamera = async () => {
    const status = await ImagePicker.requestCameraPermissionsAsync();
    if (status.granted !== true) {
      Alert.alert(
        "Camera Permission Required",
        "Please grant camera permissions."
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        allowsEditing: true,
        quality: 0.1, // Reduce the quality to manage memory usage
      });

      if (!result.canceled) {
        console.log(result);
        setImage(result.assets[0].uri);
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert(
        "Error",
        "An error occurred while trying to take a photo. Please try again."
      );
    }
  };
  return {
    image,
    openCamera,
  };
};
