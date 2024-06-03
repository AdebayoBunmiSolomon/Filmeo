import { create } from "zustand";

type trendingMoviesDataType = {
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

interface ITrendingMoviesProps {
  trendingMoviesData: trendingMoviesDataType;
  setTrendingMoviesData: (values: trendingMoviesDataType) => void;
}

export const useTrendingMoviesStore = create<ITrendingMoviesProps>()((set) => ({
  trendingMoviesData: [],
  setTrendingMoviesData: (trendingMoviesData) =>
    set({ trendingMoviesData: trendingMoviesData }),
}));
