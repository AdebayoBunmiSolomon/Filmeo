import { useState } from "react";
import { useTogglePushNotification } from "@src/components/core/services";
import { useToggleNotificationStore } from "@src/components/core/store/useToggleNotificationStore";
import { useSavePushToken } from "./useSavePushToken";

export const useNotificationSubscription = () => {
  const { togglePushNotification } = useTogglePushNotification();
  const { pushToggleOn } = useToggleNotificationStore();
  const {
    pushTokenStore,
    updatePushTokenInFireStoreToSubScribe,
    updatePushTokenInFireStoreToUnSubScribe,
  } = useSavePushToken();
  const [subscribeLoading, setSubscribeLoading] = useState<boolean>(false);

  const unsubScribeToPushNotification = async () => {
    setSubscribeLoading(true);
    try {
      await updatePushTokenInCacheAndFireStoreToUnSub();
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setSubscribeLoading(false);
    }
  };

  const subScribeToPushNotification = async () => {
    setSubscribeLoading(true);
    try {
      await updatePushTokenInCacheAndFireStoreToSub();
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setSubscribeLoading(false);
    }
  };

  const updatePushTokenInCacheAndFireStoreToSub = async () => {
    try {
      await updatePushTokenInFireStoreToSubScribe({
        id: pushTokenStore.id,
        date_created: pushTokenStore.date_created,
        device_name: pushTokenStore.device_name,
        device_type: pushTokenStore.device_type,
        token: pushTokenStore.token,
        subscribed: true,
      });
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  const updatePushTokenInCacheAndFireStoreToUnSub = async () => {
    try {
      await updatePushTokenInFireStoreToUnSubScribe({
        id: pushTokenStore.id,
        date_created: pushTokenStore.date_created,
        device_name: pushTokenStore.device_name,
        device_type: pushTokenStore.device_type,
        token: pushTokenStore.token,
        subscribed: false,
      });
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  // useEffect(() => {
  //   const initiateSubscription = async () => {
  //     if (pushToggleOn) {
  //       await subScribeToPushNotification();
  //     } else {
  //       await unsubScribeToPushNotification();
  //     }
  //   };
  //   initiateSubscription();
  // }, [pushToggleOn]);

  return {
    subScribeToPushNotification,
    unsubScribeToPushNotification,
    togglePushNotification,
    pushToggleOn,
    subscribeLoading,
  };
};
