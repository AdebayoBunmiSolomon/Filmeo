import { useAuthentication } from "@src/functions/hooks/services";
import { useAuthStore } from "@src/functions/hooks/store";
import { isUserLoggedInOnDevice } from "@src/helper/helper";
import { useAppStateCheck, useCachedResources } from "@src/hooks/state";
import { ThemeProvider } from "@src/resources/Theme";
import { Router } from "@src/router/Router";
import { AppLoader } from "@src/screens/App-Loader";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const { appState } = useAppStateCheck();
  const { logOut } = useAuthentication();
  const { isLoadingFontComplete, loadResourcesAndDataAsync } =
    useCachedResources();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  const checkIsLoggedInOnDevice = async () => {
    const isLoggedIn = await isUserLoggedInOnDevice();
    setIsAuthenticated(isLoggedIn);
  };
  useEffect(() => {
    checkIsLoggedInOnDevice();
    loadResourcesAndDataAsync();
  }, []);

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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style='auto' />
          {isLoadingFontComplete ? (
            <AppLoader />
          ) : (
            <Router isAuthenticated={isAuthenticated} />
          )}
        </GestureHandlerRootView>
      </ThemeProvider>
    </>
  );
}
