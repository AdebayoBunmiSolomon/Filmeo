import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme || "light");

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

  const toggleTheme = () => {
    console.log(theme);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
