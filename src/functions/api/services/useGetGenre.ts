import { useState } from "react";
import { useGenreStore } from "../store";
import { GetRequest } from "@src/api/request";
import { endpoint } from "@src/api/endpoints/endpoints";
import { header } from "@src/api/configuration/header";

export const useGetGenre = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { genreData, setGenreData } = useGenreStore();

  const getMovieGenres = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const { status, data } = await GetRequest(
        `${endpoint.GET_MOVIE_GENRE}`,
        header,
        {}
      );
      if (status === 200) {
        setGenreData(data.genres);
        setLoading(false);
      } else {
        console.log("error");
        setLoading(false);
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    getMovieGenres,
    loading,
    genreData,
  };
};
