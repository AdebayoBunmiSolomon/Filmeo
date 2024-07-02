import { create } from "zustand";

export type castInfoDataType = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: string;
  profile_path: string;
};

interface ICastInfoDataProps {
  castInfoData: castInfoDataType;
  setCastInfoData: (value: castInfoDataType) => void;
}

export const useCastInfoStore = create<ICastInfoDataProps>((set) => ({
  castInfoData: {
    adult: false,
    also_known_as: [],
    biography: "",
    birthday: "",
    deathday: "",
    gender: 0,
    homepage: null,
    id: 0,
    imdb_id: "",
    known_for_department: "",
    name: "",
    place_of_birth: "",
    popularity: "",
    profile_path: "",
  },
  setCastInfoData: (castInfoData) => set({ castInfoData: castInfoData }),
}));
