import { create } from "zustand";

type tvSeriesCastDataType = {
  author: string;
  author_details: {
    avatar_path: string;
    name: string;
    rating: string;
    username: string;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}[];

interface ITvSeriesCastDataProps {
  tvSeriesCastData: tvSeriesCastDataType;
  setTvSeriesCastData: (value: tvSeriesCastDataType) => void;
}

export const useTvSeriesCastStore = create<ITvSeriesCastDataProps>((set) => ({
  tvSeriesCastData: [],
  setTvSeriesCastData: (tvSeriesCastData) =>
    set({ tvSeriesCastData: tvSeriesCastData }),
}));
