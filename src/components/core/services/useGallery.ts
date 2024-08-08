import * as ImagePicker from "expo-image-picker";
import { useImageStore } from "../store";
export const useGalleryService = () => {
  const { setCapturedImage, capturedImage } = useImageStore();

  const pickImageFromGallery = async () => {
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
  };

  return {
    capturedImage,
    pickImageFromGallery,
  };
};
