import React from "react";
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { NavigationContainer } from "@react-navigation/native";

type routerProps = {
  isAuthenticated: boolean;
};

export const Router = ({ isAuthenticated }: routerProps) => {
  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};
