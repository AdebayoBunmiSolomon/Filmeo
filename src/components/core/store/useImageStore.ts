import { create } from "zustand";

interface ICapturedImageProps {
  capturedImage: string;
  setCapturedImage: (value: string) => void;
}

export const useImageStore = create<ICapturedImageProps>()((set) => ({
  capturedImage: "",
  setCapturedImage: (capturedImage) => set({ capturedImage: capturedImage }),
}));
