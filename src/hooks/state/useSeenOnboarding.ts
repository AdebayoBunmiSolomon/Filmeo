import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";

export const useSeenOnboarding = () => {
  const checkIfOnboardingSeen = async () => {
    let state;
    try {
      const status = await AsyncStorage.getItem(storageKey.SEEN_ONBOARDING);
      const parsedStatus = JSON.parse(status!);
      if (parsedStatus !== null) {
        state = parsedStatus;
        if (state === "true") {
          console.log("Seen onboarding status is true");
          return true;
        } else {
          console.log("Seen onboarding status is false");
          return false;
        }
      } else {
        console.log("Parsed status is null");
        return false;
      }
    } catch (err: any) {
      console.log("Error", err);
      return false;
    }
  };

  const registerOnboarding = async () => {
    const status = "true";
    try {
      await AsyncStorage.setItem(
        storageKey.SEEN_ONBOARDING,
        JSON.stringify(status)
      );
      console.log("Successfully registered onboarding");
    } catch (err) {
      console.log("Error registering onboarding:", err);
    }
  };

  return {
    checkIfOnboardingSeen,
    registerOnboarding,
  };
};
