import { firestoreDB } from "@src/api/configuration/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useTokenValidation = () => {
  const validateToken = async (
    collectionName: string,
    option: string,
    value: string | undefined
  ) => {
    try {
      const docRef = query(
        collection(firestoreDB, collectionName),
        where(option, "==", value)
      );
      const docSnap = await getDocs(docRef);
      if (!docSnap.empty) {
        return {
          isExits: true,
        };
      } else {
        return {
          isExits: false,
        };
      }
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  return {
    validateToken,
  };
};
