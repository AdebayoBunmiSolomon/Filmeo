import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
import { ThemeContext } from "@src/resources/Theme";
import { useContext, useEffect, useState } from "react";

export const useToggleSwitch = () => {
  const [switchOn, setSwitchOn] = useState<boolean>(false);
  const [pushToggleOn, setPushToggleOn] = useState<boolean>(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const switchToggle = () => {
    setSwitchOn(!switchOn);
  };

  const togglePushNotification = () => {
    setPushToggleOn(!pushToggleOn);
  };

  const loadSwitchOnOrOffFromStorage = async () => {
    try {
      const theme = await AsyncStorage.getItem(storageKey.THEME);
      const parsedTheme = JSON.parse(theme!);
      if (parsedTheme !== null) {
        if (parsedTheme === "dark" && switchOn) {
          setSwitchOn(true);
        } else {
          setSwitchOn(false);
        }
        setTheme(parsedTheme);
      }
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    loadSwitchOnOrOffFromStorage();
  }, [theme]);

  return {
    switchToggle,
    switchOn,
    setSwitchOn,
    togglePushNotification,
    pushToggleOn,
    setPushToggleOn,
  };
};
