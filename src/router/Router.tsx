import React, { useContext } from "react";
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@src/resources/Theme";

type routerProps = {
  isAuthenticated: boolean;
};

export const Router = ({ isAuthenticated }: routerProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <NavigationContainer>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};
