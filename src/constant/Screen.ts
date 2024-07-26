import { AuthStackParamList } from "@src/router/Types";
import React from "react";
import * as AuthScreens from "@src/screens/auth";

export type authScreenTypes = {
  screenName: keyof AuthStackParamList;
  component: React.ComponentType<any>;
};

export const authScreens: authScreenTypes[] = [
  // {
  //   screenName: "Onboarding",
  //   component: AuthScreens.Onboarding,
  // },
  {
    screenName: "Login",
    component: AuthScreens.Login,
  },
  {
    screenName: "RegisterFlowOne",
    component: AuthScreens.RegisterFlowOne,
  },
  {
    screenName: "RegisterFlowTwo",
    component: AuthScreens.RegisterFlowTwo,
  },
  {
    screenName: "Otp",
    component: AuthScreens.Otp,
  },
];
