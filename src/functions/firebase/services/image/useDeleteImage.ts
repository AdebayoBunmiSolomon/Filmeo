import { firestoreStorage } from "@src/api/configuration/firebase";
import { deleteObject, ref } from "firebase/storage";

export const useDeleteImage = () => {
  const deleteImg = async (imageName: string): Promise<boolean> => {
    try {
      const imageRef = ref(firestoreStorage, `images/${imageName}`);
      await deleteObject(imageRef);
      return true;
    } catch (error) {
      console.log("Error", error);
      return false;
    }
  };

  return {
    deleteImg,
  };
};
