import { create } from "zustand";

type tvSeriesReviewDataType = {
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

interface ITvSeriesReviewProps {
  tvSeriesReviewData: tvSeriesReviewDataType;
  setTvSeriesReviewData: (value: tvSeriesReviewDataType) => void;
}

export const useTvSeriesReviewStore = create<ITvSeriesReviewProps>((set) => ({
  tvSeriesReviewData: [],
  setTvSeriesReviewData: (tvSeriesReviewData) =>
    set({
      tvSeriesReviewData: tvSeriesReviewData,
    }),
}));
