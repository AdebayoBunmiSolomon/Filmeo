import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useState } from "react";
import { useTvSeriesReviewStore } from "../../store";

export const useGetTvSeriesReviews = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { tvSeriesReviewData, setTvSeriesReviewData } =
    useTvSeriesReviewStore();

  const getTvSeriesReview = async (tvSeriesId: number) => {
    setLoading(true);
    setIsError(false);
    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_TV_SERIES_REVIEWS}${tvSeriesId}/reviews`,
        header,
        {}
      );
      if (status === 200) {
        setTvSeriesReviewData(data.results);
      } else {
        console.log("Error getting data");
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
    getTvSeriesReview,
    tvSeriesReviewData,
    isError,
    loading,
  };
};
