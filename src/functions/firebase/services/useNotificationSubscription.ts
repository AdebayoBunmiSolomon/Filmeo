import { useEffect, useState } from "react";
import { usePushTokenStore } from "../store";
import { useToggleSwitch } from "@src/components/core/services";
import { useModalMessage, useNetworkConnected } from "@src/hooks/state";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestoreDB } from "@src/api/configuration/firebase";
import { collections } from "../collection";
import { useTokenValidation } from "../rule";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
export const useNotificationSubscription = () => {
  const { pushToggleOn, togglePushNotification, setPushToggleOn } =
    useToggleSwitch();
  const [subscribeLoading, setSubscribeLoading] = useState<boolean>(false);
  const { pushTokenStore } = usePushTokenStore();
  const { networkState } = useNetworkConnected();
  const { modalMessage, setModalMessage } = useModalMessage();
  const { validateToken } = useTokenValidation();

  const checkPushNotificationSubscription = async () => {
    setSubscribeLoading(true);
    try {
      if (networkState.networkState) {
        setModalMessage({
          ...modalMessage,
          visible: !modalMessage.visible,
          title: "Please connect device to a stable network",
          btnTitle: "Ok",
          type: "warning",
        });
      } else {
        const docRef = query(
          collection(firestoreDB, collections.subscribed_token_collection),
          where("token", "==", pushTokenStore.token)
        );
        const docSnap = await getDocs(docRef);
        if (!docSnap.empty) {
          setPushToggleOn(true);
          return true;
        } else {
          setPushToggleOn(false);
          return false;
        }
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setSubscribeLoading(false);
    }
  };

  const subScribeToPushNotification = async () => {
    setSubscribeLoading(true);
    try {
      if (networkState.networkState) {
        setModalMessage({
          ...modalMessage,
          visible: !modalMessage.visible,
          title: "Please connect device to a stable network",
          btnTitle: "Ok",
          type: "warning",
        });
      } else {
        const token = await validateToken(
          collections.subscribed_token_collection,
          "token",
          pushTokenStore.token
        );
        if (token?.isExits) {
          console.log("token already exits, no need to subscribe");
        } else {
          const result = await addDoc(
            collection(firestoreDB, collections.subscribed_token_collection),
            {
              ...pushTokenStore,
            }
          );
          if (result.id) {
            //save the id of the document saved to firestore db when subscribed to push notification
            await AsyncStorage.setItem(
              storageKey.SUBSCRIBED_TO_PUSH_NOTIFICATION_ID,
              JSON.stringify(result.id)
            );
            setModalMessage({
              ...modalMessage,
              visible: !modalMessage.visible,
              title: "Successfully subscribed to push notification",
              btnTitle: "Ok",
              type: "success",
            });
          }
        }
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setSubscribeLoading(false);
    }
  };

  const getSubscriptionPushId = async () => {
    const id = await AsyncStorage.getItem(
      storageKey.SUBSCRIBED_TO_PUSH_NOTIFICATION_ID
    );
    const parsedId = JSON.parse(id!);
    if (parsedId !== null || undefined || "") {
      return parsedId;
    } else {
      return null;
    }
  };

  const unsubScribeToPushNotification = async () => {
    setSubscribeLoading(true);
    try {
      if (networkState.networkState) {
        setModalMessage({
          ...modalMessage,
          visible: !modalMessage.visible,
          title: "Please connect device to a stable network",
          btnTitle: "Ok",
          type: "warning",
        });
      } else {
        const token = await validateToken(
          collections.subscribed_token_collection,
          "token",
          pushTokenStore.token
        );
        if (token?.isExits) {
          const subscriptionId: string = await getSubscriptionPushId();
          if (subscriptionId) {
            await deleteDoc(
              doc(
                firestoreDB,
                collections.subscribed_token_collection,
                subscriptionId
              )
            );
          }
        } else {
          console.log("token doesn't exist, cannot unsubscribe");
        }
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setSubscribeLoading(false);
    }
  };

  useEffect(() => {
    checkPushNotificationSubscription();
  }, []);

  useEffect(() => {
    if (pushToggleOn) {
      subScribeToPushNotification();
    }
  }, [pushToggleOn]);

  return {
    checkPushNotificationSubscription,
    subScribeToPushNotification,
    unsubScribeToPushNotification,
    togglePushNotification,
    pushToggleOn,
    subscribeLoading,
  };
};
