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
        console.log("user data is", userDataParsed);
        setUserData({
          ...userData,
          id: userDataParsed.id,
          email: userDataParsed.email,
          name: userDataParsed.name,
          picture: userDataParsed.picture,
          avatar_name: userDataParsed.avatar_name,
        });
      } else {
        setIsUserDataEmpty(true);
        setUserData({
          ...userData,
          id: "",
          email: "",
          name: "",
          picture: "",
          avatar_name: "",
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
