import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useState } from "react";
import { useMovieDetailsStore } from "../store";

export const useGetMovieDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { movieDetails, setMovieDetails } = useMovieDetailsStore();

  const getMovieDetails = async (movieId: number) => {
    try {
      setLoading(true);
      const { status, data } = await GetRequest(
        `${endpoint.GET_MOVIE_DETAILS}${movieId}`,
        header,
        {}
      );
      if (status === 200) {
        console.log(data);
        setMovieDetails(data);
        setIsError(false);
      } else {
        setIsError(true);
        console.log("Error processing get request");
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    getMovieDetails,
    movieDetails,
    loading,
    isError,
  };
};
