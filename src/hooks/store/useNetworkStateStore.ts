import { create } from "zustand";

type networkStateDataType = {
  networkState: boolean;
};

interface INetworkStateProps {
  networkState: networkStateDataType;
  setNetworkState: (value: networkStateDataType) => void;
}

/**
 * @networkState returns false which means it's connected but true means not connected
 */
export const useNetworkStateStore = create<INetworkStateProps>((set) => ({
  networkState: {
    networkState: false,
  },
  setNetworkState: (networkState) => set({ networkState: networkState }),
}));
