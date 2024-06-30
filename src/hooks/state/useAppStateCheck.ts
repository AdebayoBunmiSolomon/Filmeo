import { useEffect, useState } from "react";
import { AppState } from "react-native";

export const useAppStateCheck = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        setAppState(nextAppState);
      }
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  return {
    appState,
  };
};
