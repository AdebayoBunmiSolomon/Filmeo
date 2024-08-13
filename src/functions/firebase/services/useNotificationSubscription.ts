import { useEffect, useState } from "react";
import { usePushTokenStore } from "../store";
import { useTogglePushNotification } from "@src/components/core/services";
import { useNetworkConnected } from "@src/hooks/state";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { firestoreDB } from "@src/api/configuration/firebase";
import { collections } from "../collection";
import { useTokenValidation } from "../rule";
import { useModalMessage } from "@src/hooks/store";
import { useCheckNotificationSubscription } from "./useCheckNotificationSubscription";
import { useToggleNotificationStore } from "@src/components/core/store/useToggleNotificationStore";

export const useNotificationSubscription = () => {
  const {
    saveSubscriptionToDeviceStorage,
    checkPushNotificationSubscription,
    getSubscriptionFromDeviceStorage,
    removeSubscriptionFromDeviceStorage,
  } = useCheckNotificationSubscription();
  const { togglePushNotification } = useTogglePushNotification();
  const { setPushToggleOn, pushToggleOn, isSubscriptionChecked } =
    useToggleNotificationStore();
  const [subscribeLoading, setSubscribeLoading] = useState<boolean>(false);
  const { pushTokenStore } = usePushTokenStore();
  const { networkState } = useNetworkConnected();
  const { setModalMessage, modalMessage } = useModalMessage();
  const { validateToken } = useTokenValidation();

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
          console.log("deleted successfully");
          const subscriptionData = await getSubscriptionFromDeviceStorage();
          if (subscriptionData) {
            await deleteDoc(
              doc(
                firestoreDB,
                collections.subscribed_token_collection,
                subscriptionData.id
              )
            );
          }
        }
        await removeSubscriptionFromDeviceStorage();
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
            setModalMessage({
              ...modalMessage,
              visible: !modalMessage.visible,
              title: "Successfully subscribed for push notification",
              btnTitle: "Ok",
              type: "success",
            });
          }
          await saveSubscriptionToDeviceStorage({
            id: result.id,
            subscribed: true,
          });
          setPushToggleOn(true);
        }
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setSubscribeLoading(false);
    }
  };

  useEffect(() => {
    if (isSubscriptionChecked && pushToggleOn) {
      subScribeToPushNotification();
      console.log("is already subscribed and push toggle on");
    } else if (isSubscriptionChecked && !pushToggleOn) {
      unsubScribeToPushNotification();
      console.log("is not already subscribed and push toggle off");
    }
  }, [pushToggleOn, isSubscriptionChecked]);

  return {
    checkPushNotificationSubscription,
    subScribeToPushNotification,
    unsubScribeToPushNotification,
    togglePushNotification,
    pushToggleOn,
    subscribeLoading,
  };
};
