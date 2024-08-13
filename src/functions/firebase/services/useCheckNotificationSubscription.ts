import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
import { useToggleNotificationStore } from "@src/components/core/store/useToggleNotificationStore";

type subscribeToPushNotificationData = {
  id: string;
  subscribed: boolean;
};

export const useCheckNotificationSubscription = () => {
  const { setPushToggleOn } = useToggleNotificationStore();

  //check notification subscription on device storage
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

  //return the subscription details if subscribed to
  const getSubscriptionFromDeviceStorage = async () => {
    const data = await AsyncStorage.getItem(
      storageKey.SUBSCRIBED_TO_PUSH_NOTIFICATION
    );
    const parsedData = JSON.parse(data!);
    if (parsedData !== null || undefined || "") {
      return parsedData;
    } else {
      console.log("no record found in getSubscriptionFromDeviceStorage");
    }
  };

  //remove subscription data to device
  const removeSubscriptionFromDeviceStorage = async () => {
    try {
      await AsyncStorage.removeItem(storageKey.SUBSCRIBED_TO_PUSH_NOTIFICATION);
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  //save subscription data to device
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

  return {
    checkPushNotificationSubscription,
    getSubscriptionFromDeviceStorage,
    removeSubscriptionFromDeviceStorage,
    saveSubscriptionToDeviceStorage,
  };
};
