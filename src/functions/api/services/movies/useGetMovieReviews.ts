import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useState } from "react";
import { useMovieReviewStore } from "../../store";

export const useGetMovieReviews = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { movieReviewData, setMovieReviewData } = useMovieReviewStore();

  const getMovieReviews = async (movieId: number) => {
    setLoading(true);
    setIsError(false);
    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_MOVIE_REVIEW}${movieId}/reviews`,
        header,
        {}
      );
      if (status === 200) {
        setMovieReviewData(data.results);
        console.log(data.results);
        setIsError(false);
      } else {
        console.log("Error getting movie reviews");
        setIsError(true);
        setMovieReviewData([]);
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    isError,
    getMovieReviews,
    movieReviewData,
  };
};
