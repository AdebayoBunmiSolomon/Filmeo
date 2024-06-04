import { create } from "zustand";

type likedMovieDataType = {
  id: number;
  title: string;
  videoImgUrl: string;
}[];

interface ILikedMovieProps {
  likedMovie: likedMovieDataType;
  setLikedMovie: (values: likedMovieDataType) => void;
}

export const useLikedMovieStore = create<ILikedMovieProps>()((set) => ({
  likedMovie: [],
  setLikedMovie: (likedMovie) => set({ likedMovie: likedMovie }),
}));
