import { useAuthStore } from "@src/functions/hooks/store";
import { isUserLoggedInOnDevice } from "@src/helper/helper";
import { useCachedResources } from "@src/hooks/state";
import { ThemeProvider } from "@src/resources/Theme";
import { Router } from "@src/router/Router";
import { AppLoader } from "@src/screens/App-Loader";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const { isLoadingFontComplete, loadResourcesAndDataAsync } =
    useCachedResources();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const checkIsLoggedInOnDevice = async () => {
    const isLoggedIn = await isUserLoggedInOnDevice();
    setIsAuthenticated(isLoggedIn);
  };
  useEffect(() => {
    checkIsLoggedInOnDevice();
    loadResourcesAndDataAsync();
  }, []);
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
