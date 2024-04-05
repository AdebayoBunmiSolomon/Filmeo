import { Loader } from "@src/components/core";
import { useCachedResources } from "@src/hooks/state";
import { ThemeProvider } from "@src/resources/Theme";
import { Router } from "@src/router/Router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const fontLoading = useCachedResources();

  return (
    <>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style='auto' />
          {fontLoading ? <Loader sizes='large' color='orange' /> : <Router />}
        </GestureHandlerRootView>
      </ThemeProvider>
    </>
  );
}
