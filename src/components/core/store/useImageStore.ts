import { create } from "zustand";

interface ICapturedImageProps {
  capturedImage: string;
  imgFileData: any;
  setCapturedImage: (value: string) => void;
  setImgFileData: (value: any) => void;
}

export const useImageStore = create<ICapturedImageProps>()((set) => ({
  capturedImage: "",
  imgFileData: null,
  setCapturedImage: (capturedImage) => set({ capturedImage: capturedImage }),
  setImgFileData: (imgFileData) => set({ imgFileData: imgFileData }),
}));
