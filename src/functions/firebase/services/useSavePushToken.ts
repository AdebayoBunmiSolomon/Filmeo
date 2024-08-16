import { tokenFormDataType } from "@src/form/types";
import { useState } from "react";
import { firestoreDB } from "@src/api/configuration/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { collections } from "../collection";
import { usePushTokenStore } from "../store";
import { useModalMessage } from "@src/hooks/store";
import { useNetworkConnected } from "@src/hooks/state";
import { useToggleNotificationStore } from "@src/components/core/store";

export const useSavePushToken = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { pushTokenStore, setPushTokenStore } = usePushTokenStore();
  const { setModalMessage, modalMessage } = useModalMessage();
  const { networkState } = useNetworkConnected();
  const { setPushToggleOn } = useToggleNotificationStore();

  //function to save push token when app first launched...
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
        const docData = docSnap.docs[0]?.data();
        setPushTokenStore({
          ...pushTokenStore,
          id: docSnap.docs[0]?.id,
          device_name: data.device_name,
          device_type: data.device_type,
          token: data.token,
          date_created: data.date_created,
          subscribed: data.subscribed,
        });
        setPushToggleOn(docData?.subscribed);
      } else {
        const docData = docSnap.docs[0]?.data();
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
          subscribed: data.subscribed,
        });
        setPushToggleOn(docData?.subscribed);
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  //function to set device push token for subscription i.e. set it to TRUE on firestore
  const updatePushTokenInFireStoreToSubScribe = async (
    data: tokenFormDataType
  ) => {
    try {
      if (networkState.networkState) {
        setModalMessage({
          ...modalMessage,
          visible: !modalMessage.visible,
          title: "Please connect device to a stable network",
          btnTitle: "Ok",
          type: "warning",
        });
        return;
      }
      await setDoc(
        doc(firestoreDB, collections.token_collection, String(data.id)),
        {
          ...data,
        }
      );
      setModalMessage({
        ...modalMessage,
        visible: !modalMessage.visible,
        title: "Successfully subscribed for push notification",
        btnTitle: "Ok",
        type: "success",
      });
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  //function to set device push token for subscription i.e. set it to FALSE on firestore
  const updatePushTokenInFireStoreToUnSubScribe = async (
    data: tokenFormDataType
  ) => {
    try {
      if (networkState.networkState) {
        setModalMessage({
          ...modalMessage,
          visible: !modalMessage.visible,
          title: "Please connect device to a stable network",
          btnTitle: "Ok",
          type: "warning",
        });
        return;
      }
      await setDoc(
        doc(firestoreDB, collections.token_collection, String(data.id)),
        {
          ...data,
        }
      );
      setModalMessage({
        ...modalMessage,
        visible: !modalMessage.visible,
        title: "Successfully unsubscribed for push notification",
        btnTitle: "Ok",
        type: "success",
      });
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  return {
    loading,
    savePushTokenToFirestore,
    updatePushTokenInFireStoreToSubScribe,
    updatePushTokenInFireStoreToUnSubScribe,
    pushTokenStore,
  };
};
