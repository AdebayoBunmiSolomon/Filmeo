import { useState } from "react";
import { useSearchMovieStore } from "../../store";
import { GetRequest } from "@src/api/request";
import { endpoint } from "@src/api/endpoints/endpoints";
import { header } from "@src/api/configuration/header";
import { useNextPrev } from "@src/hooks/state";

export const useSearchMovies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { searchMovieData, setSearchMovieData } = useSearchMovieStore();
  const { pageNumber, nextBtn, prevBtn, setPageNumber } = useNextPrev();

  const getSearchMovie = async (
    queryString: string,
    includeAdult: boolean,
    pageNumber: number
  ) => {
    setLoading(true);
    setIsError(false);
    try {
      setLoading(true);
      const { data, status } = await GetRequest(
        `${endpoint.GET_MOVIE_BY_SEARCH_QUERY}query=${queryString}&include_adult=${includeAdult}&page=${pageNumber}`,
        header,
        {}
      );
      setLoading(true);
      if (status === 200) {
        setSearchMovieData(data.results);
        console.log(data.results);
        setIsError(false);
      } else {
        setIsError(true);
        console.log("Error searching movies");
      }
    } catch (err: any) {
      console.log("Error processing data", err);
      setIsError(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    getSearchMovie,
    searchMovieData,
    loading,
    isError,
    nextBtn,
    prevBtn,
    setPageNumber,
    pageNumber,
  };
};
