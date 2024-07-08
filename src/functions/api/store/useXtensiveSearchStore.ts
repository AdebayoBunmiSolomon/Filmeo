import { create } from "zustand";

//data type for media_type that is "movie"
export type xtensiveMovieMediaTypeData = {
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

//data type for media_type that is "tv" & others
export type xtensiveMovieOtherTypeData = {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: 7;
  origin_country: string[];
};

type xtensiveSearchData = (
  | xtensiveMovieMediaTypeData
  | xtensiveMovieOtherTypeData
)[];

interface IXtensiveMovieSearchProps {
  xtensiveSearchData: xtensiveSearchData;
  setXtensiveSearchData: (values: xtensiveSearchData) => void;
}

export const useXtensiveMovieSearchStore = create<IXtensiveMovieSearchProps>(
  (set) => ({
    xtensiveSearchData: [],
    setXtensiveSearchData: (xtensiveSearchData) =>
      set({ xtensiveSearchData: xtensiveSearchData }),
  })
);
