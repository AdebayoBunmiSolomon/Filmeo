import { firestoreDB } from "@src/api/configuration/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";

type flowOneFormDataErrType = {
  fullname: boolean;
  email: boolean;
  phone_number: boolean;
};

type flowTwoFormDataErrType = {
  username: boolean;
};

type loginFormDataErr = {
  username: boolean;
};

export const useFormValidation = () => {
  const [flowOneFrmErr, setFlowOneFrmErr] = useState<flowOneFormDataErrType>({
    fullname: false,
    email: false,
    phone_number: false,
  });
  const [flowTwoFrmErr, setFlowTwoFrmErr] = useState<flowTwoFormDataErrType>({
    username: false,
  });
  const [loginFormErr, setLoginFormErr] = useState<loginFormDataErr>({
    username: false,
  });
  const validateField = async (
    collectionName: string,
    option: string,
    value: any
  ) => {
    const docRef = query(
      collection(firestoreDB, collectionName),
      where(option, "==", value)
    );
    const docSnap = await getDocs(docRef);
    if (!docSnap.empty) {
      return {
        error: true,
        message: `${option} already exists`,
      };
    } else {
      return {
        error: false,
        message: `${option} does not exist`,
      };
    }
  };

  return {
    validateField,
    flowOneFrmErr,
    setFlowOneFrmErr,
    flowTwoFrmErr,
    setFlowTwoFrmErr,
    loginFormErr,
    setLoginFormErr,
  };
};
