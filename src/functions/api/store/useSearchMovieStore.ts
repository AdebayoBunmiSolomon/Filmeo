import { create } from "zustand";

type searchMovieDataType = {
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

interface ISearchMovieProps {
  searchMovieData: searchMovieDataType;
  setSearchMovieData: (values: searchMovieDataType) => void;
}

export const useSearchMovieStore = create<ISearchMovieProps>((set) => ({
  searchMovieData: [],
  setSearchMovieData: (searchMovieData) =>
    set({ searchMovieData: searchMovieData }),
}));
