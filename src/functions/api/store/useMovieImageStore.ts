import { create } from "zustand";

type movieImageDataType = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  uri: string;
  vote_average: number;
  vote_count: number;
  width: number;
}[];

interface IMovieImageProps {
  movieImageData: movieImageDataType;
  setMovieImageData: (value: movieImageDataType) => void;
}

export const useMovieImagesStore = create<IMovieImageProps>((set) => ({
  movieImageData: [],
  setMovieImageData: (movieImageData) =>
    set({ movieImageData: movieImageData }),
}));
