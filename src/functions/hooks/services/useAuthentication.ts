import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store";
import { storageKey } from "@src/cache";
import { useState } from "react";
import { useUserDataStore } from "@src/hooks/store";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "@src/api/configuration/firebase";

export const useAuthentication = () => {
  const { setIsAuthenticated } = useAuthStore();
  const { setUserData, userData } = useUserDataStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const Login = async () => {
    setLoading(true);
    setIsError(false);
    try {
      const userIsLoggedInToDevice = await AsyncStorage.getItem(
        storageKey.AUTHENTICATED
      );
      const parsedUserIsLoggedInToDevice = JSON.parse(userIsLoggedInToDevice!);
      setLoading(true);
      setIsError(false);
      if (parsedUserIsLoggedInToDevice === null) {
        await AsyncStorage.setItem(
          storageKey.AUTHENTICATED,
          JSON.stringify(true)
        );
        setIsAuthenticated(true);
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.log("Error", err);
      setIsAuthenticated(false);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    setIsError(false);
    try {
      await AsyncStorage.removeItem(storageKey.AUTHENTICATED);
      setIsAuthenticated(false);
      signOut(firebaseAuth);
      setUserData({
        ...userData,
        id: "" || 0,
        email: "",
        name: "",
        picture: "",
        username: "",
        avatar_name: "",
      });
    } catch (err: any) {
      console.log("Error logging out", err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    Login,
    logOut,
    isError,
    loading,
  };
};
