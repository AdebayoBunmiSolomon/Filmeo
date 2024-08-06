import { useState } from "react";
import { createUser, flowOneFormDataType } from "@src/form/types";
import { useFormValidation } from "../rule";
import { collections } from "../collection";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useModalMessage, useNetworkConnected } from "@src/hooks/state";
import { firestoreDB } from "@src/api/configuration/firebase";
import { addDoc, collection } from "firebase/firestore";

export const useSaveUser = () => {
  const {
    validateField,
    flowOneFrmErr,
    setFlowOneFrmErr,
    flowTwoFrmErr,
    setFlowTwoFrmErr,
  } = useFormValidation();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation: NavigationProp<any> = useNavigation();
  const { modalMessage, setModalMessage } = useModalMessage();
  const { networkState } = useNetworkConnected();

  const firstFlow = async (flowOneData: flowOneFormDataType) => {
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
        const fullname = await validateField(
          collections.user_collection,
          "fullname",
          flowOneData.fullname
        );
        const email = await validateField(
          collections.user_collection,
          "email",
          flowOneData.email
        );
        const phone_number = await validateField(
          collections.user_collection,
          "phone_number",
          flowOneData.phone_number
        );
        //fullname error trapper
        if (fullname.error) {
          setFlowOneFrmErr((prev) => ({
            ...prev,
            fullname: true,
          }));
          console.log(fullname.message);
        } else {
          setFlowOneFrmErr((prev) => ({
            ...prev,
            fullname: false,
          }));
        }
        //email error trapper
        if (email.error) {
          setFlowOneFrmErr((prev) => ({
            ...prev,
            email: true,
          }));
          console.log(email.message);
          return;
        } else {
          setFlowOneFrmErr((prev) => ({
            ...prev,
            email: false,
          }));
        }

        //phone_number error trapper
        if (phone_number.error) {
          setFlowOneFrmErr((prev) => ({
            ...prev,
            phone_number: true,
          }));
          console.log(phone_number.message);
          return;
        } else {
          setFlowOneFrmErr((prev) => ({
            ...prev,
            phone_number: false,
          }));
        }
        //final validation before taking user to the next screen
        if (!fullname.error && !email.error && !phone_number.error) {
          navigation.navigate("RegisterFlowTwo", {
            data: {
              email: flowOneData.email,
              fullName: flowOneData.fullname,
              phoneNumber: flowOneData.phone_number,
            },
          });
        }
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  const secondFlow = async (flowTwoData: createUser) => {
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
          flowTwoData.username
        );
        //fullname error trapper
        if (username.error) {
          setFlowTwoFrmErr((prev) => ({
            ...prev,
            username: true,
          }));
          console.log(username.message);
        } else {
          setFlowTwoFrmErr((prev) => ({
            ...prev,
            username: false,
          }));
        }
        //final validation before taking user to the next screen
        if (!username.error) {
          const result = await addDoc(
            collection(firestoreDB, collections.user_collection),
            {
              ...flowTwoData,
            }
          );
          if (result.id) {
            setModalMessage({
              ...modalMessage,
              visible: !modalMessage.visible,
              title: "Registration successful, proceed to login",
              btnTitle: "Ok",
              type: "success",
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
    flowOneFrmErr,
    loading,
    firstFlow,
    secondFlow,
    flowTwoFrmErr,
    setModalMessage,
    modalMessage,
  };
};
