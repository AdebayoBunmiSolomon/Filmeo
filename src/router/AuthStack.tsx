import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { AuthStackParamList } from "./Types";
import { authScreens } from "@src/constant/Screen";

const AuthScreenStack = createNativeStackNavigator<AuthStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const AuthStack = () => {
  return (
    <AuthScreenStack.Navigator screenOptions={headerOptions}>
      {authScreens &&
        authScreens.map((items, index) => (
          <AuthScreenStack.Screen
            name={items.screenName}
            key={index}
            component={items.component}
            options={{
              animation:
                items.screenName === "GetStarted"
                  ? "slide_from_right"
                  : items.screenName === "RegisterFlowOne"
                  ? "slide_from_right"
                  : undefined,
            }}
          />
        ))}
    </AuthScreenStack.Navigator>
  );
};
