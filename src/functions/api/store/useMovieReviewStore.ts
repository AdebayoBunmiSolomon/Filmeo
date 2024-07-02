import { create } from "zustand";

type movieReviewDataType = {
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

interface IMovieReviewProps {
  movieReviewData: movieReviewDataType;
  setMovieReviewData: (value: movieReviewDataType) => void;
}

export const useMovieReviewStore = create<IMovieReviewProps>((set) => ({
  movieReviewData: [],
  setMovieReviewData: (movieReviewData) =>
    set({
      movieReviewData: movieReviewData,
    }),
}));
