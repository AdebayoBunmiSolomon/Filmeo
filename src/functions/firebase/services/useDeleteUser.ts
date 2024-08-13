import { useState } from "react";
import { useDeleteImage } from "./image";
import { useNetworkConnected, useSeenOnboarding } from "@src/hooks/state";
import { deleteDoc, doc } from "firebase/firestore";
import { firestoreDB } from "@src/api/configuration/firebase";
import { collections } from "../collection";
import { useModalMessage, useUserDataStore } from "@src/hooks/store";
import { Alert } from "react-native";
import { useAuthentication } from "@src/functions/hooks/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
import { useNotificationSubscription } from "./useNotificationSubscription";

export const useDeleteUser = () => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { deleteImg } = useDeleteImage();
  const { networkState } = useNetworkConnected();
  const { modalMessage, setModalMessage } = useModalMessage();
  const { userData } = useUserDataStore();
  const { unRegisterOnboarding } = useSeenOnboarding();
  const { logOut } = useAuthentication();
  const { unsubScribeToPushNotification } = useNotificationSubscription();

  const clearCacheOnDevice = async () => {
    await unsubScribeToPushNotification();
    await AsyncStorage.removeItem(storageKey.WATCH_LIST);
    await AsyncStorage.removeItem(storageKey.THEME);
    await logOut();
    await unRegisterOnboarding();
    await AsyncStorage.removeItem(storageKey.USER_DATA);
    await AsyncStorage.removeItem(storageKey.PUSH_TOKEN);
    await AsyncStorage.removeItem(storageKey.SUBSCRIBED_TO_PUSH_NOTIFICATION);
  };

  const deleteUser = async () => {
    setDeleteLoading(true);
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
        Alert.alert("Delete user", "Are you sure you want to delete account?", [
          {
            text: "No",
            onPress: () => console.log("No pressed"),
          },
          {
            text: "Yes, Continue",
            onPress: async () => {
              setDeleteLoading(true);
              try {
                const imgDeleted = await deleteImg();
                if (imgDeleted) {
                  await deleteDoc(
                    doc(
                      firestoreDB,
                      collections.user_collection,
                      String(userData.id)
                    )
                  );
                  setModalMessage({
                    ...modalMessage,
                    visible: !modalMessage.visible,
                    title: `${userData.name?.toUpperCase()}'s data is deleted successfully`,
                    btnTitle: "Ok",
                    type: "success",
                  });
                  await clearCacheOnDevice();
                } else {
                  console.log("Image not deleted successfully");
                }
              } catch (err: any) {
                console.log("Error", err);
              } finally {
                setDeleteLoading(false);
              }
            },
          },
        ]);
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    deleteUser,
    deleteLoading,
    clearCacheOnDevice,
  };
};
