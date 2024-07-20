import {
  CLOUD_CONSOLE_ANDROID_CLIENT_ID_DEV,
  CLOUD_CONSOLE_WEB_CLIENT_ID_DEV,
} from "@env";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useCallback, useState } from "react";
import { AuthSessionResult } from "expo-auth-session";
import { useUserDataStore } from "../store";
import { useAuthStore } from "@src/functions/hooks/store";
import { useSeenOnboarding } from "./useSeenOnboarding";

const config = {
  webClientId: CLOUD_CONSOLE_WEB_CLIENT_ID_DEV,
  androidClientId: CLOUD_CONSOLE_ANDROID_CLIENT_ID_DEV,
};

export const useGoogleSignIn = () => {
  const [request, response, promptAsync] = Google.useAuthRequest(config);
  const [gLoading, setGloading] = useState<boolean>(false);
  const { userData, setUserData } = useUserDataStore();
  const { setIsAuthenticated } = useAuthStore();
  const { registerOnboarding } = useSeenOnboarding();

  const getGUserProfile = async (token: string) => {
    setGloading(true);
    if (!token) return;
    setGloading(true);
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      if (user) {
        setUserData(user);
        setIsAuthenticated(true);
        await registerOnboarding();
      } else {
        setUserData({
          ...userData,
          id: "" || 0,
          email: "",
          name: "",
          picture: "",
        });
        setIsAuthenticated(false);
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setGloading(false);
    }
  };

  const handleToken = useCallback((response: AuthSessionResult | null) => {
    if (response?.type === "success") {
      const authentication = (response as any).authentication;
      if (authentication) {
        const token = authentication.accessToken;
        console.log("access token", token);
        getGUserProfile(token);
      }
    }
  }, []);

  useEffect(() => {
    handleToken(response);
  }, [response, handleToken]);

  return { request, promptAsync, gLoading };
};
