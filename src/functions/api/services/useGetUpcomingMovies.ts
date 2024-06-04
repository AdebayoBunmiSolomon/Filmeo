import { useState } from "react";
import { useUpcomingMoviesStore } from "../store";
import { endpoint } from "@src/api/endpoints/endpoints";
import { header } from "@src/api/configuration/header";
import { GetRequest } from "@src/api/request";

export const useGetUpcomingMovies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { upcomingMoviesData, setUpcomingMoviesData } =
    useUpcomingMoviesStore();

  const getUpcomingMovies = async (pageNumber: number) => {
    setLoading(true);
    try {
      setLoading(true);
      const { status, data } = await GetRequest(
        `${endpoint.GET_UPCOMING_MOVIES}${pageNumber}`,
        header,
        {}
      );
      setLoading(true);
      if (status === 200) {
        setUpcomingMoviesData(data.results);
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
    getUpcomingMovies,
    loading,
    upcomingMoviesData,
  };
};
