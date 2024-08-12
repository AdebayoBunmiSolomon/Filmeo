import { useEffect, useState } from "react";
import { usePushTokenStore } from "../store";
import { useToggleSwitch } from "@src/components/core/services";
import { useNetworkConnected } from "@src/hooks/state";
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
import { useModalMessage } from "@src/hooks/store";

type subscribeToPushNotificationData = {
  id: string;
  subscribed: boolean;
};
export const useNotificationSubscription = () => {
  const { pushToggleOn, togglePushNotification, setPushToggleOn } =
    useToggleSwitch();
  const [subscribeLoading, setSubscribeLoading] = useState<boolean>(false);
  const { pushTokenStore } = usePushTokenStore();
  const { networkState } = useNetworkConnected();
  const { setModalMessage, modalMessage } = useModalMessage();
  const { validateToken } = useTokenValidation();

  const checkPushNotificationSubscription = async () => {
    const data = await getSubscriptionFromDeviceStorage();
    if (data.subscribed === true) {
      setPushToggleOn(true);
      return true;
    } else {
      setPushToggleOn(false);
      return false;
    }
  };

  const getSubscriptionFromDeviceStorage = async () => {
    const data = await AsyncStorage.getItem(
      storageKey.SUBSCRIBED_TO_PUSH_NOTIFICATION
    );
    const parsedData = JSON.parse(data!);
    if (parsedData !== null || undefined || "") {
      return parsedData;
    } else {
      console.log("no record found");
    }
  };

  const saveSubscriptionToDeviceStorage = async (
    data: subscribeToPushNotificationData
  ) => {
    try {
      await AsyncStorage.setItem(
        storageKey.SUBSCRIBED_TO_PUSH_NOTIFICATION,
        JSON.stringify(data)
      );
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  const removeSubscriptionFromDeviceStorage = async () => {
    try {
      await AsyncStorage.removeItem(storageKey.SUBSCRIBED_TO_PUSH_NOTIFICATION);
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  const unsubScribeToPushNotification = async () => {
    //unsubscribe should check if it exists in DB before it does any operation
    const isSubscribed = await checkPushNotificationSubscription();
    if (isSubscribed) {
      await removeSubscriptionFromDeviceStorage();
      console.log("Un-subscribed to push notification");
    }
  };

  const subScribeToPushNotification = async () => {
    const isSubscribed = await checkPushNotificationSubscription();
    if (!isSubscribed) {
      await saveSubscriptionToDeviceStorage({
        id: "testing1234",
        subscribed: true,
      });
      console.log("Subscribed to push notification");
    }
  };

  useEffect(() => {
    const initiateSubscription = async () => {
      if (pushToggleOn) {
        subScribeToPushNotification();
      } else {
        unsubScribeToPushNotification();
      }
    };
    initiateSubscription();
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
