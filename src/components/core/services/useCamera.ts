import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useImageStore } from "../store";
import { useState } from "react";

export const useCameraServices = () => {
  const { setCapturedImage, capturedImage } = useImageStore();
  const [cameraLoading, setCameraLoading] = useState<boolean>(false);

  const openCamera = async () => {
    setCameraLoading(true);
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
        const source = { uri: result.assets[0].uri };
        setCapturedImage(source.uri);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert(
        "Error",
        "An error occurred while trying to take a photo. Please try again."
      );
    } finally {
      setCameraLoading(false);
    }
  };
  return {
    capturedImage,
    openCamera,
    cameraLoading,
  };
};
