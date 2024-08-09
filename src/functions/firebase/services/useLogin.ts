import {
  useModalMessage,
  useNetworkConnected,
  useSeenOnboarding,
} from "@src/hooks/state";
import { useState } from "react";
import { useFormValidation } from "../rule";
import { collections } from "../collection";
import { loginFormDataType } from "@src/form/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreDB } from "@src/api/configuration/firebase";
import { useAuthentication } from "@src/functions/hooks/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { networkState } = useNetworkConnected();
  const { modalMessage, setModalMessage } = useModalMessage();
  const { validateField, setLoginFormErr, loginFormErr } = useFormValidation();
  const { Login } = useAuthentication();
  const { registerOnboarding } = useSeenOnboarding();

  const fireStoreLogin = async (loginData: loginFormDataType) => {
    setLoading(true);
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
        const username = await validateField(
          collections.user_collection,
          "username",
          loginData.username
        );
        //if there's no error returned, that means username does not exist
        if (!username.error) {
          setLoginFormErr((prev) => ({
            ...prev,
            username: true,
          }));
          console.log(username.message);
        } else {
          setLoginFormErr((prev) => ({
            ...prev,
            username: false,
          }));
        }
        //if there is error returned, that means username exists
        if (username.error) {
          const docRef = query(
            collection(firestoreDB, collections.user_collection),
            where("username", "==", loginData.username),
            where("password", "==", loginData.password)
          );
          const docSnap = await getDocs(docRef);
          if (!docSnap.empty) {
            //if username and password match
            const data = docSnap.docs[0].data();
            const dataId = docSnap.docs[0]?.id;
            const userAuthData = {
              id: dataId,
              email: data?.email,
              name: data?.fullname,
              picture: data?.avatar_url,
              username: data?.username,
              avatar_name: data?.avatar_name,
            };
            await AsyncStorage.setItem(
              storageKey.USER_DATA,
              JSON.stringify(userAuthData)
            );
            await Login();
            await registerOnboarding();
          } else {
            setModalMessage({
              ...modalMessage,
              visible: !modalMessage.visible,
              title: "Username and password do not match. please try again",
              btnTitle: "Ok",
              type: "danger",
            });
          }
        }
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fireStoreLogin,
    loginFormErr,
    loading,
    modalMessage,
    setModalMessage,
  };
};
