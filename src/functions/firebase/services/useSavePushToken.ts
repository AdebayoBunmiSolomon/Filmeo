import { tokenFormDataType } from "@src/form/types";
import { useState } from "react";
import { firestoreDB } from "@src/api/configuration/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { collections } from "../collection";
import { usePushTokenStore } from "../store";

export const useSavePushToken = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { pushTokenStore, setPushTokenStore } = usePushTokenStore();

  const savePushTokenToFirestore = async (data: tokenFormDataType) => {
    let docId = "";
    setLoading(true);
    try {
      setLoading(true);
      const docRef = query(
        collection(firestoreDB, collections.token_collection),
        where("token", "==", data.token)
      );
      const docSnap = await getDocs(docRef);
      if (!docSnap.empty) {
        setPushTokenStore({
          ...pushTokenStore,
          id: docSnap.docs[0]?.id,
          device_name: data.device_name,
          device_type: data.device_type,
          token: data.token,
          date_created: data.date_created,
        });
      } else {
        const docRef = await addDoc(
          collection(firestoreDB, collections.token_collection),
          {
            ...data,
          }
        );
        setPushTokenStore({
          ...pushTokenStore,
          id: docRef.id,
          device_name: data.device_name,
          device_type: data.device_type,
          token: data.token,
          date_created: data.date_created,
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
