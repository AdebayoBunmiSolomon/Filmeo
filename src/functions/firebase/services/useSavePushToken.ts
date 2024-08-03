import { tokenFormDataType } from "@src/form/types";
import { useState } from "react";
import { firestoreDB } from "@src/api/configuration/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { collections } from "../collection";

export const useSavePushToken = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const savePushTokenToFirestore = async (data: tokenFormDataType) => {
    setLoading(true);
    try {
      setLoading(true);
      const docRef = query(
        collection(firestoreDB, collections.token_collection),
        where("token", "==", data.token)
      );
      const docSnap = await getDocs(docRef);
      if (!docSnap.empty) {
        console.log("Token already exists in firestore DB");
      } else {
        await addDoc(collection(firestoreDB, collections.token_collection), {
          ...data,
        });
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    savePushTokenToFirestore,
  };
};
