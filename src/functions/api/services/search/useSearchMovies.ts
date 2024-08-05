import { useEffect, useState } from "react";
import { useSearchMovieStore } from "../../store";
import { GetRequest } from "@src/api/request";
import { endpoint } from "@src/api/endpoints/endpoints";
import { header } from "@src/api/configuration/header";
import { useNextPrev } from "@src/hooks/state";
import { includeAdult } from "@src/constant/data";
import { returnBooleanConstraintsForYesOrNoSelection } from "@src/helper/helper";

export const useSearchMovies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { searchMovieData, setSearchMovieData } = useSearchMovieStore();
  const { pageNumber, nextBtn, prevBtn, setPageNumber } = useNextPrev();
  const [selection, setSelection] = useState<string>(includeAdult[0].name);
  const [queryString, setQueryString] = useState<string>("");

  const include_adult = returnBooleanConstraintsForYesOrNoSelection(selection);

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
        setIsError(false);
      } else {
        setIsError(true);
        console.log("Error searching movies");
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsError(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchMovie(queryString, include_adult, pageNumber);
  }, [queryString, include_adult, pageNumber]);

  return {
    getSearchMovie,
    searchMovieData,
    loading,
    isError,
    nextBtn,
    prevBtn,
    setPageNumber,
    pageNumber,
    queryString,
    selection,
    setQueryString,
    setSelection,
    include_adult,
  };
};
