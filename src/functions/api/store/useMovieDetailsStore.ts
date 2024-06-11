import { create } from "zustand";

type movieDetailsDataType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any; // Replace with actual type if available
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
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
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  video_id: string;
};

interface IMovieDetailsProps {
  movieDetails: movieDetailsDataType;
  setMovieDetails: (values: movieDetailsDataType) => void;
}

export const useMovieDetailsStore = create<IMovieDetailsProps>((set) => ({
  movieDetails: {
    adult: false,
    backdrop_path: "",
    belongs_to_collection: null, // Replace with actual type if available
    budget: 0,
    genres: [],
    homepage: "",
    id: 0,
    imdb_id: "",
    origin_country: [""],
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    production_companies: [],
    production_countries: [],
    release_date: "",
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: "",
    tagline: "",
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0,
    video_id: "",
  },
  setMovieDetails: (movieDetails) => set({ movieDetails: movieDetails }),
}));
