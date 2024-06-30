import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useState } from "react";
import { useMovieDetailsStore } from "../../store";

export const useGetMovieDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { movieDetails, setMovieDetails } = useMovieDetailsStore();
  const [movieVideoKey, setMovieVideoKey] = useState<any[]>([]);

  const getYouTubeVideoId = async (movieId: number) => {
    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_YOUTUBE_KEY}${movieId}/videos`,
        header,
        {}
      );
      if (status === 200) {
        return data.results;
      } else {
        console.log("Error getting video id");
        return null;
      }
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  const getMovieDetails = async (movieId: number) => {
    setLoading(true);
    setIsError(false);
    try {
      setLoading(true);
      const { status, data } = await GetRequest(
        `${endpoint.GET_MOVIE_DETAILS}${movieId}`,
        header,
        {}
      );
      const videoKey = await getYouTubeVideoId(movieId);
      setLoading(true);
      if (status === 200) {
        setMovieDetails(data);
        setMovieVideoKey(videoKey);
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
    movieVideoKey,
    movieDetails,
    loading,
    isError,
  };
};
