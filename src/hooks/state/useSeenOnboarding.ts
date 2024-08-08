import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
import { useState } from "react";

export const useSeenOnboarding = () => {
  const [onboardingSeenLoading, setOnboardingSeenLoading] =
    useState<boolean>(false);
  const checkIfOnboardingSeen = async () => {
    setOnboardingSeenLoading(true);
    let state;
    try {
      setOnboardingSeenLoading(true);
      // await AsyncStorage.removeItem(storageKey.SEEN_ONBOARDING);
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
    } finally {
      setOnboardingSeenLoading(false);
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
    onboardingSeenLoading,
  };
};
