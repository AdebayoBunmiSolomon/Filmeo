import { Platform } from "react-native";

export const usePlatform = () => {
  const platform = Platform.OS;
  return platform;
};
