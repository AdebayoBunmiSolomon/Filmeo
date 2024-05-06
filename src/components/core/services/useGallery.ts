import * as ImagePicker from "expo-image-picker";
import { useImageStore } from "../store";
export const useGalleryService = () => {
  const { setCapturedImage } = useImageStore();

  const pickImageFromGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
    }
  };

  return {
    pickImageFromGallery,
  };
};
