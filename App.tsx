import { useToggleNotificationStore } from "@src/components/core/store/useToggleNotificationStore";
import { useCheckNotificationSubscription } from "@src/functions/firebase/services";
import { useAuthentication } from "@src/functions/hooks/services";
import { useAuthStore } from "@src/functions/hooks/store";
import { isUserLoggedInOnDevice } from "@src/helper/helper";
import {
  useAppStateCheck,
  useCachedResources,
  useCheckIfUserDataEmpty,
} from "@src/hooks/state";
import { ThemeProvider } from "@src/resources/Theme";
import { Router } from "@src/router/Router";
import { AppLoader } from "@src/screens/App-Loader";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const { appState } = useAppStateCheck();
  const { logOut } = useAuthentication();
  const { isLoadingFontComplete, loadResourcesAndDataAsync } =
    useCachedResources();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
  const { checkIfUserDataEmpty } = useCheckIfUserDataEmpty();
  const { checkPushNotificationSubscription } =
    useCheckNotificationSubscription();
  const { setIsSubscriptionChecked } = useToggleNotificationStore();

  const checkIsLoggedInOnDevice = async () => {
    const isLoggedIn = await isUserLoggedInOnDevice();
    setIsAuthenticated(isLoggedIn);
  };

  useEffect(() => {
    const checkPushSubscription = async () => {
      setIsSubscriptionChecked(true);
      await checkPushNotificationSubscription();
    };
    checkPushSubscription();
  }, []);

  useEffect(() => {
    checkIsLoggedInOnDevice();
    loadResourcesAndDataAsync();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      checkIfUserDataEmpty();
    }
  }, [isAuthenticated]);

  //Log-out user when app is in background after a minute
  useEffect(() => {
    if (appState === "background") {
      const timer = setTimeout(() => {
        logOut();
      }, 60000); // 10 seconds
      setLogoutTimer(timer);
    } else {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        setLogoutTimer(null);
      }
    }
  }, [appState]);
  return (
    <>
      <ThemeProvider>
        <PaperProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {isLoadingFontComplete ? (
              <AppLoader />
            ) : (
              <Router isAuthenticated={isAuthenticated} />
            )}
          </GestureHandlerRootView>
        </PaperProvider>
      </ThemeProvider>
    </>
  );
}
