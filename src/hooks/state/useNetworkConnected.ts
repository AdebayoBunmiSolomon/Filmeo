import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useNetworkStateStore } from "../store";
import { useEffect } from "react";

/**
 * @networkState returns false which means it's connected but true means not connected
 */
export const useNetworkConnected = () => {
  const { setNetworkState, networkState } = useNetworkStateStore();

  useEffect(() => {
    const handleNetInfoChange = (state: NetInfoState) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      console.log(offline);
      setNetworkState({
        ...networkState,
        networkState: offline, // Assuming `networkState` is the key you're managing in your store
      });
    };

    const removeNetInfoSubscription =
      NetInfo.addEventListener(handleNetInfoChange);

    // Initial check
    NetInfo.fetch().then(handleNetInfoChange);

    return () => removeNetInfoSubscription();
  }, []);

  return {
    networkState,
  };
};
