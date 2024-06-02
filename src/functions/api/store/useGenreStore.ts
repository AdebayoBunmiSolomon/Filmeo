import { create } from "zustand";

type genreDataType = {
  id: string;
  name: string;
}[];

interface IGenreDataProps {
  genreData: genreDataType;
  setGenreData: (values: genreDataType) => void;
}

export const useGenreStore = create<IGenreDataProps>()((set) => ({
  genreData: [],
  setGenreData: (genreData) => set({ genreData: genreData }),
}));
