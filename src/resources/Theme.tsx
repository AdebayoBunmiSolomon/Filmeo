import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
// import { useToggleSwitch } from "@src/components/core/services";

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme || "light");
  // const {setSwitchOn, switchOn} = useToggleSwitch();

  // Add your theme logic here
  useEffect(() => {
    // Load saved theme from storage
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(storageKey.THEME);
        const parsedTheme = JSON.parse(savedTheme!);
        if (parsedTheme) {
          setTheme(parsedTheme);
        } else {
          setTheme(colorScheme || "light");
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    getTheme();
  }, [theme, colorScheme]);

  const toggleTheme = async (switchOn: boolean) => {
    // console.log("Switch", switchOn);
    try {
      if (switchOn) {
        await AsyncStorage.setItem(storageKey.THEME, JSON.stringify("dark"));
        setTheme("dark");
      } else {
        await AsyncStorage.setItem(storageKey.THEME, JSON.stringify("light"));
        setTheme(colorScheme || "light");
      }
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
