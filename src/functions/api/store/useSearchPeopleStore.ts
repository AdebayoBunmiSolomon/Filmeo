import { create } from "zustand";

type searchPeopleDataType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: knownForDataType;
}[];

type knownForDataType = {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}[];

interface IPeopleProps {
  peopleData: searchPeopleDataType;
  setPeopleData: (values: searchPeopleDataType) => void;
}

export const useSearchPeopleStore = create<IPeopleProps>((set) => ({
  peopleData: [],
  setPeopleData: (peopleData) => set({ peopleData: peopleData }),
}));
