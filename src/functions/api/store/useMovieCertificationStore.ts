import { create } from "zustand";

export type movieCertificationsDataType = {
  countryCode: string;
  certifications: {
    certification: string;
    meaning: string;
    order: number;
  }[];
}[];

interface IMovieCertificationsProps {
  movieCertificationsData: movieCertificationsDataType;
  setMovieCertificationsData: (value: movieCertificationsDataType) => void;
}

export const useMovieCertificationsStore = create<IMovieCertificationsProps>(
  (set) => ({
    movieCertificationsData: [],
    setMovieCertificationsData: (movieCertificationsData) =>
      set({ movieCertificationsData: movieCertificationsData }),
  })
);
