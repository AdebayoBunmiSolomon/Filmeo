import { firestoreStorage } from "@src/api/configuration/firebase";
import { useUserDataStore } from "@src/hooks/store";
import { deleteObject, ref } from "firebase/storage";

export const useDeleteImage = () => {
  const { userData } = useUserDataStore();
  const deleteImg = async () => {
    const imageRef = ref(firestoreStorage, `images/${userData.avatar_name}`);
    try {
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
