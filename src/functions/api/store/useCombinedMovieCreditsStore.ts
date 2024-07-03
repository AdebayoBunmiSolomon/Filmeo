import { create } from "zustand";

type combinedMovieCreditsDataType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}[];

interface ICombinedMovieCreditsProps {
  combinedMovieCreditsData: combinedMovieCreditsDataType;
  setCombinedMovieCreditsData: (values: combinedMovieCreditsDataType) => void;
}

export const useCombinedMovieCreditsStore = create<ICombinedMovieCreditsProps>(
  (set) => ({
    combinedMovieCreditsData: [],
    setCombinedMovieCreditsData: (combinedMovieCreditsData) =>
      set({ combinedMovieCreditsData: combinedMovieCreditsData }),
  })
);
