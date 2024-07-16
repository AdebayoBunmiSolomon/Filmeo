import { create } from "zustand";

type tvSeriesImgDataType = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  uri: string;
  vote_average: number;
  vote_count: number;
  width: number;
}[];

interface ITvSeriesImgProps {
  tvSeriesImageData: tvSeriesImgDataType;
  setTvSeriesImageData: (values: tvSeriesImgDataType) => void;
}

export const useTvSeriesImageStore = create<ITvSeriesImgProps>((set) => ({
  tvSeriesImageData: [],
  setTvSeriesImageData: (tvSeriesImageData) =>
    set({ tvSeriesImageData: tvSeriesImageData }),
}));
