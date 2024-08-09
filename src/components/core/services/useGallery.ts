import * as ImagePicker from "expo-image-picker";
import { useImageStore } from "../store";
import { useState } from "react";
export const useGalleryService = () => {
  const { setCapturedImage, capturedImage } = useImageStore();
  const [galleryLoading, setGalleryLoading] = useState<boolean>(false);

  const pickImageFromGallery = async () => {
    setGalleryLoading(true);
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // console.log("gallery", result);

      if (!result.canceled) {
        const source = { uri: result.assets[0].uri };
        setCapturedImage(source.uri);
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setGalleryLoading(false);
    }
  };

  return {
    capturedImage,
    pickImageFromGallery,
    galleryLoading,
  };
};
