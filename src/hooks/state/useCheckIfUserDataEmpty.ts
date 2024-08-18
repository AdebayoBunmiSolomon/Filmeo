import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
import { useState } from "react";
import { useUserDataStore } from "../store";

export const useCheckIfUserDataEmpty = () => {
  const [isUserDataEmpty, setIsUserDataEmpty] = useState<boolean>(false);
  const { setUserData, userData } = useUserDataStore();
  const checkIfUserDataEmpty = async () => {
    try {
      setIsUserDataEmpty(false);
      const userDataJSON = await AsyncStorage.getItem(storageKey.USER_DATA);
      const userDataParsed = JSON.parse(userDataJSON!);
      if (userDataParsed) {
        setIsUserDataEmpty(false);
        // console.log("user data is", userDataParsed);
        setUserData({
          ...userData,
          id: userDataParsed.id,
          email: userDataParsed.email,
          fullname: userDataParsed.fullname,
          avatar_url: userDataParsed.avatar_url,
          avatar_name: userDataParsed.avatar_name,
          created_at: userDataParsed.created_at,
          updated_at: userDataParsed.updated_at,
          phone_number: userDataParsed.phone_number,
          password: userDataParsed.password,
          username: userDataParsed.username,
        });
      } else {
        setIsUserDataEmpty(true);
        setUserData({
          ...userData,
          id: "",
          email: "",
          fullname: "",
          avatar_url: "",
          avatar_name: "",
          created_at: "",
          updated_at: "",
          phone_number: "",
          password: "",
          username: "",
        });
        return null;
      }
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  return {
    checkIfUserDataEmpty,
    isUserDataEmpty,
  };
};
