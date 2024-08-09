import { useState } from "react";
import { useDeleteImage } from "./image";
import { useModalMessage, useNetworkConnected } from "@src/hooks/state";
import { deleteDoc, doc } from "firebase/firestore";
import { firestoreDB } from "@src/api/configuration/firebase";
import { collections } from "../collection";
import { useUserDataStore } from "@src/hooks/store";

export const useDeleteUser = () => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { deleteImg } = useDeleteImage();
  const { networkState } = useNetworkConnected();
  const { modalMessage, setModalMessage } = useModalMessage();
  const { userData } = useUserDataStore();

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
        const imgDeleted = await deleteImg();
        if (imgDeleted) {
          await deleteDoc(
            doc(firestoreDB, collections.user_collection, String(userData.id))
          );
          setModalMessage({
            ...modalMessage,
            visible: !modalMessage.visible,
            title: `${userData.name?.toUpperCase()}'s data is deleted successfully`,
            btnTitle: "Ok",
            type: "success",
          });
        } else {
          console.log("Image not deleted successfully");
        }
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
    modalMessage,
    setModalMessage,
  };
};
