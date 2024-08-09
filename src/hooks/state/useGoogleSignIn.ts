import {
  CLOUD_CONSOLE_ANDROID_CLIENT_ID_DEV,
  CLOUD_CONSOLE_IOS_CLIENT_ID_DEV,
} from "@env";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { firebaseAuth } from "@src/api/configuration/firebase";
import { useSeenOnboarding } from "./useSeenOnboarding";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
import { useAuthentication } from "@src/functions/hooks/services";

const config = {
  iosClientId: CLOUD_CONSOLE_IOS_CLIENT_ID_DEV,
  androidClientId: CLOUD_CONSOLE_ANDROID_CLIENT_ID_DEV,
};
export const useGoogleSignIn = () => {
  const [request, response, promptAsync] = Google.useAuthRequest(config);
  const { registerOnboarding } = useSeenOnboarding();
  const [gLoading, setGloading] = useState<boolean>(false);
  const { Login } = useAuthentication();

  const handleToken = useCallback(async () => {
    setGloading(true);
    try {
      setGloading(true);
      if (response?.type === "success") {
        const { id_token } = response?.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const result = await signInWithCredential(firebaseAuth, credential);
        if (result.user) {
          const userAuthData = {
            id: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
            username: null,
            picture: result.user.photoURL,
            avatar_name: "",
          };
          await registerOnboarding();
          await Login();
          await AsyncStorage.setItem(
            storageKey.USER_DATA,
            JSON.stringify(userAuthData)
          );
        } else {
          console.log("Error signIn-In to google");
        }
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setGloading(false);
    }
  }, [response]);

  useEffect(() => {
    handleToken();
  }, [response, handleToken]);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userAuthData = {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          picture: user.photoURL,
        };
        await AsyncStorage.setItem(
          storageKey.USER_DATA,
          JSON.stringify(userAuthData)
        );
      } else {
        console.log("Error logging in");
      }
    });
    return () => unsub();
  }, []);

  return {
    promptAsync,
    gLoading,
  };
};
