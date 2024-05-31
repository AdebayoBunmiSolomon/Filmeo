import { useCachedResources } from "@src/hooks/state";
import { ThemeProvider } from "@src/resources/Theme";
import { Router } from "@src/router/Router";
import { AppLoader } from "@src/screens/App-Loader";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BASE_URL } from "@env";

export default function App() {
  const fontLoading = useCachedResources();
  console.log(BASE_URL);
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
