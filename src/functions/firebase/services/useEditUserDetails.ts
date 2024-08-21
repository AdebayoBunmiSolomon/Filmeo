import { firestoreDB } from "@src/api/configuration/firebase";
import { editDetailsFormType } from "@src/form/types";
import { useModalMessage, useUserDataStore } from "@src/hooks/store";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { collections } from "../collection";
import {
  convertInputValueToLowercaseAndRemoveWhiteSpace,
  getCurrentDate,
} from "@src/helper/helper";

export const useEditUserDetails = () => {
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const { modalMessage, setModalMessage } = useModalMessage();
  const { userData } = useUserDataStore();

  const editUserDetails = async (data: editDetailsFormType) => {
    setEditLoading(true);
    const editedData = {
      id: userData?.id,
      email: convertInputValueToLowercaseAndRemoveWhiteSpace(data?.email),
      fullname: convertInputValueToLowercaseAndRemoveWhiteSpace(data?.fullname),
      avatar_url: userData?.avatar_url,
      username: convertInputValueToLowercaseAndRemoveWhiteSpace(data?.username),
      avatar_name: userData?.avatar_name,
      created_at: userData?.created_at,
      password: convertInputValueToLowercaseAndRemoveWhiteSpace(data?.password),
      phone_number: data?.phone_number,
      updated_at: getCurrentDate(),
    };
    try {
      await setDoc(
        doc(firestoreDB, collections.user_collection, String(userData.id)),
        {
          ...editedData,
        }
      );
      setModalMessage({
        ...modalMessage,
        visible: !modalMessage.visible,
        title: "Update successful, proceed to login",
        btnTitle: "Ok",
        type: "success",
      });
    } catch (err: any) {
      console.log("Error", err);
      setModalMessage({
        ...modalMessage,
        visible: !modalMessage.visible,
        title: "Update un-successful, failed to update user data",
        btnTitle: "Ok",
        type: "danger",
      });
    } finally {
      setEditLoading(false);
    }
  };

  return {
    editLoading,
    editUserDetails,
  };
};
