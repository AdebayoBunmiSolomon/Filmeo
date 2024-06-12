import React, { useEffect } from "react";
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { NavigationContainer } from "@react-navigation/native";
import { isUserLoggedInOnDevice } from "@src/helper/helper";
import { useAuthStore } from "@src/functions/hooks/store";

export const Router = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const checkIsLoggedInOnDevice = async () => {
    const isLoggedIn = await isUserLoggedInOnDevice();
    setIsAuthenticated(isLoggedIn);
  };

  useEffect(() => {
    checkIsLoggedInOnDevice();
  }, [isAuthenticated]);
  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};
