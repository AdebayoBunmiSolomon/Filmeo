import React, { useEffect, useState } from "react";
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { NavigationContainer } from "@react-navigation/native";
import { isUserLoggedInOnDevice } from "@src/helper/helper";

export const Router = () => {
  const [isLoggedInOnDevice, setIsLoggedInOnDevice] = useState<boolean>(false);
  const checkIsLoggedInOnDevice = async () => {
    const isLoggedIn = await isUserLoggedInOnDevice();
    console.log("From router.tsx", isLoggedIn);
    setIsLoggedInOnDevice(isLoggedIn);
  };

  useEffect(() => {
    checkIsLoggedInOnDevice();
  }, [isLoggedInOnDevice]);
  return (
    <>
      <NavigationContainer>
        {isLoggedInOnDevice ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};
