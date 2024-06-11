import { create } from "zustand";

type movieCastDataType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  uri: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}[];

interface IMovieCastDataProps {
  movieCastData: movieCastDataType;
  setMovieCastData: (value: movieCastDataType) => void;
}

export const useMovieCastStore = create<IMovieCastDataProps>((set) => ({
  movieCastData: [],
  setMovieCastData: (movieCastData) => set({ movieCastData: movieCastData }),
}));
