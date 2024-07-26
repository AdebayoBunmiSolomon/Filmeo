import React, { useContext, useEffect, useState } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { AuthStackParamList } from "./Types";
import { authScreens } from "@src/constant/Screen";
import { useSeenOnboarding } from "@src/hooks/state";
import * as AuthScreens from "@src/screens/auth";
import { Loader } from "@src/components/core";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Screen } from "@src/screens/Screen";

const AuthScreenStack = createNativeStackNavigator<AuthStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const AuthStack = () => {
  const { checkIfOnboardingSeen, onboardingSeenLoading } = useSeenOnboarding();
  const { theme } = useContext(ThemeContext);
  const [seenOnboarding, setSeenOnboarding] = useState<boolean>(false);
  useEffect(() => {
    const loadOnboardingState = async () => {
      setSeenOnboarding(await checkIfOnboardingSeen());
    };
    loadOnboardingState();
  }, []);
  return (
    <>
      {onboardingSeenLoading ? (
        <Screen>
          <Loader
            sizes='large'
            color={
              theme === "dark" ? colors.primaryColor2 : colors.primaryColor
            }
          />
        </Screen>
      ) : (
        <>
          <AuthScreenStack.Navigator screenOptions={headerOptions}>
            {!seenOnboarding && (
              <>
                <AuthScreenStack.Screen
                  name='Onboarding'
                  component={AuthScreens.Onboarding}
                />
                <AuthScreenStack.Screen
                  name='GetStarted'
                  component={AuthScreens.GetStarted}
                />
              </>
            )}
            {authScreens &&
              authScreens.map((items, index) => (
                <AuthScreenStack.Screen
                  name={items.screenName}
                  key={index}
                  component={items.component}
                  options={{
                    animation:
                      items.screenName === "RegisterFlowOne"
                        ? "slide_from_right"
                        : undefined,
                  }}
                />
              ))}
          </AuthScreenStack.Navigator>
        </>
      )}
    </>
  );
};
