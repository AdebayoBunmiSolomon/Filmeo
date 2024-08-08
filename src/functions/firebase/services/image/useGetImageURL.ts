import { firestoreStorage } from "@src/api/configuration/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import uuid from "react-native-uuid";

/**
 *
 * @returns downloadURL of the image uploaded to firestore project
 */
export const useGetImageURL = () => {
  const [uploadingLoading, setUploadLoading] = useState<boolean>(false);
  const getImgURL = async (image: any) => {
    setUploadLoading(true);
    try {
      if (image) {
        // Fetch the image from the provided URI
        const response = await fetch(image);
        const blob = await response.blob();
        // Generate a unique filename using UUID
        const imgId = uuid.v4() as string;
        const filename = `${imgId}-${image.substring(
          image.lastIndexOf("/") + 1
        )}`;
        // Create a reference to the image file in Firebase Storage
        const imageRef = ref(firestoreStorage, `images/${filename}`);
        // Upload the image blob to Firebase Storage
        const snapshot = await uploadBytes(imageRef, blob);
        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(filename);
        return downloadURL;
      } else {
        return null;
      }
    } catch (err: unknown) {
      console.log("Error", err);
      if (err instanceof Error) {
        return err.toString();
      }
    } finally {
      setUploadLoading(false);
    }
  };

  return {
    getImgURL,
    uploadingLoading,
  };
};
