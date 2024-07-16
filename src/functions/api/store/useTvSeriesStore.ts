import { create } from "zustand";

type tvSeriesDataType = {
  adult: boolean;
  backdrop_path: string;
  created_by: any[]; // assuming an array, adjust the type as necessary
  episode_run_time: any[]; // assuming an array, adjust the type as necessary
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
  };
  name: string;
  networks: any[]; // assuming an array, adjust the type as necessary
  next_episode_to_air: null | any; // assuming nullable type, adjust as necessary
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

interface ITvSeriesProps {
  tvSeriesData: tvSeriesDataType;
  setTvSeriesData: (values: tvSeriesDataType) => void;
}

export const useTvSeriesStore = create<ITvSeriesProps>((set) => ({
  tvSeriesData: {
    adult: false,
    backdrop_path: "",
    created_by: [], // assuming an array, adjust the type as necessary
    episode_run_time: [], // assuming an array, adjust the type as necessary
    first_air_date: "",
    genres: [],
    homepage: "",
    id: 0,
    in_production: false,
    languages: [],
    last_air_date: "",
    last_episode_to_air: {
      id: 0,
      name: "",
      overview: "",
      vote_average: 0,
      vote_count: 0,
      air_date: "",
      episode_number: 0,
      episode_type: "",
      production_code: "",
      runtime: 0,
    },
    name: "",
    networks: [], // assuming an array, adjust the type as necessary
    next_episode_to_air: null, // assuming nullable type, adjust as necessary
    number_of_episodes: 0,
    number_of_seasons: 0,
    origin_country: [],
    original_language: "",
    original_name: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    production_companies: [],
    production_countries: [],
    seasons: [],
    spoken_languages: [],
    status: "",
    tagline: "",
    type: "",
    vote_average: 0,
    vote_count: 0,
  },
  setTvSeriesData: (tvSeriesData) => set({ tvSeriesData: tvSeriesData }),
}));
