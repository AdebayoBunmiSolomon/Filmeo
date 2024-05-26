import React from "react";
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { NavigationContainer } from "@react-navigation/native";

export const Router = () => {
  const isAuthenticated: boolean = true;
  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};
