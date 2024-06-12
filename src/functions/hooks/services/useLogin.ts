import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store";
import { storageKey } from "@src/cache";

export const useLogin = () => {
  const { setIsAuthenticated } = useAuthStore();

  const Login = async () => {
    try {
      const userIsLoggedInToDevice = await AsyncStorage.getItem(
        storageKey.AUTHENTICATED
      );
      const parsedUserIsLoggedInToDevice = JSON.parse(userIsLoggedInToDevice!);
      if (parsedUserIsLoggedInToDevice === null) {
        await AsyncStorage.setItem(
          storageKey.AUTHENTICATED,
          JSON.stringify(true)
        );
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.log("Error processing if user is logged in", err);
      setIsAuthenticated(false);
    }
  };

  return {
    Login,
  };
};
