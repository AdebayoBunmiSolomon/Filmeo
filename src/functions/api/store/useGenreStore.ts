import { create } from "zustand";

type genreDataType = {
  id: string;
  name: string;
};

interface IGenreDataProps {
  genreData: genreDataType;
  setGenreData: (values: genreDataType) => void;
}

export const useGenreStore = create<IGenreDataProps>()((set) => ({
  genreData: {
    id: "",
    name: "",
  },
  setGenreData: (genreData) => set({ genreData: genreData }),
}));
