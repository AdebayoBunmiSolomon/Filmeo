import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useImageStore } from "../store";

export const useCameraServices = () => {
  const [image, setImage] = useState<any>(null);
  const { setCapturedImage } = useImageStore();

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    let result;
    if (status !== "granted") {
      Alert.alert(
        "Camera Permission Required",
        "Please grant camera permissions."
      );
      return;
    }
    result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setCapturedImage(result.assets[0].uri);
    }
  };
  return {
    image,
    openCamera,
  };
};
