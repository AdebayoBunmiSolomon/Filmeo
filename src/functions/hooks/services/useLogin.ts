import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store";
import { storageKey } from "@src/cache";
import { useState } from "react";

export const useLogin = () => {
  const { setIsAuthenticated } = useAuthStore();
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
      console.log("Error processing if user is logged in", err);
      setIsAuthenticated(false);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    Login,
    isError,
    loading,
  };
};
