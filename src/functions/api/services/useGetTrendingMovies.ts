import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useState } from "react";
import { useTrendingMoviesStore } from "../store";

export const useGetTrendingMovies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { trendingMoviesData, setTrendingMoviesData } =
    useTrendingMoviesStore();

  const getTrendingMovies = async (timeWindow: string) => {
    setLoading(true);
    try {
      setLoading(true);
      const { status, data } = await GetRequest(
        `${endpoint.GET_TRENDING_MOVIES}${timeWindow}`,
        header,
        {}
      );
      setLoading(true);
      if (status === 200) {
        setTrendingMoviesData(data.results);
        setLoading(false);
      } else {
        console.log("Error loading data");
        setLoading(true);
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    getTrendingMovies,
    loading,
    trendingMoviesData,
  };
};
