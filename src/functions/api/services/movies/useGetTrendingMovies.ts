import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useEffect, useState } from "react";
import { useTrendingMoviesStore } from "../../store";
import { trendingMovieTimeWindow } from "@src/constant/data";

export const useGetTrendingMovies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { trendingMoviesData, setTrendingMoviesData } =
    useTrendingMoviesStore();
  const [timeWindow, setTimeWindow] = useState<string>(
    trendingMovieTimeWindow[0].name
  );

  const getTrendingMovies = async (timeWindow: string) => {
    setLoading(true);
    setIsError(false);
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
        setIsError(false);
      } else {
        console.log("Error loading data");
        setIsError(true);
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      getTrendingMovies(timeWindow);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [timeWindow]);

  return {
    getTrendingMovies,
    loading,
    trendingMoviesData,
    timeWindow,
    setTimeWindow,
    isError,
  };
};
