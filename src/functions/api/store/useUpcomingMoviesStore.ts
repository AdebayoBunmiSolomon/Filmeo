import { create } from "zustand";

type upcomingMoviesDataType = {
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

interface IUpcomingMoviesProps {
  upcomingMoviesData: upcomingMoviesDataType;
  setUpcomingMoviesData: (values: upcomingMoviesDataType) => void;
}

export const useUpcomingMoviesStore = create<IUpcomingMoviesProps>()((set) => ({
  upcomingMoviesData: [],
  setUpcomingMoviesData: (upcomingMoviesData) =>
    set({ upcomingMoviesData: upcomingMoviesData }),
}));
