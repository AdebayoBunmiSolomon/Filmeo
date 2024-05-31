import { useCachedResources } from "@src/hooks/state";
import { ThemeProvider } from "@src/resources/Theme";
import { Router } from "@src/router/Router";
import { AppLoader } from "@src/screens/App-Loader";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const fontLoading = useCachedResources();

  return (
    <>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style='auto' />
          {fontLoading ? <AppLoader /> : <Router />}
        </GestureHandlerRootView>
      </ThemeProvider>
    </>
  );
}
