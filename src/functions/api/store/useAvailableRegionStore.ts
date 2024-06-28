import { create } from "zustand";

type availableRegionDataType = {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}[];

interface IAvailableRegionProps {
  availableRegionData: availableRegionDataType;
  setAvailableRegionData: (values: availableRegionDataType) => void;
}

export const useAvailableRegionStore = create<IAvailableRegionProps>()(
  (set) => ({
    availableRegionData: [],
    setAvailableRegionData: (availableRegionData) =>
      set({ availableRegionData: availableRegionData }),
  })
);
