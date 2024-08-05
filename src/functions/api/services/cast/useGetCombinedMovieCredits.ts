import { useState } from "react";
import { useCombinedMovieCreditsStore } from "../../store";
import { GetRequest } from "@src/api/request";
import { endpoint } from "@src/api/endpoints/endpoints";
import { header } from "@src/api/configuration/header";

export const useGetCombinedMovieCredits = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { combinedMovieCreditsData, setCombinedMovieCreditsData } =
    useCombinedMovieCreditsStore();

  const getCombinedMovieCredits = async (castId: number) => {
    setLoading(true);
    setIsError(false);
    // console.log(castId);
    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_COMBINED_MOVIE_CREDITS_OF_CAST}${castId}/combined_credits`,
        header,
        {}
      );
      if (status === 200) {
        console.log(data.cast);
        setCombinedMovieCreditsData(data.cast);
        setIsError(false);
      } else {
        console.log("Error getting combined credits");
        setIsError(true);
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    combinedMovieCreditsData,
    loading,
    isError,
    getCombinedMovieCredits,
  };
};
