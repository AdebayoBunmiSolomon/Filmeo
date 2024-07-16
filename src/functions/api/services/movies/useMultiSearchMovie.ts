import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { returnBooleanConstraintsForYesOrNoSelection } from "@src/helper/helper";
import { useState } from "react";
import { useXtensiveMovieSearchStore } from "../../store";

export const useMultiSearchMovie = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { xtensiveSearchData, setXtensiveSearchData } =
    useXtensiveMovieSearchStore();

  const multiSearchMovie = async (
    queryString: string,
    includeAdult: string,
    pageNumber: number
  ) => {
    setLoading(true);
    setIsError(false);
    const include_adult =
      returnBooleanConstraintsForYesOrNoSelection(includeAdult);

    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_MOVIE_BY_MULTI_SEARCH}include_adult=${include_adult}&query=${queryString}&page=${pageNumber}`,
        header,
        {}
      );
      if (status === 200) {
        console.log(data.results);
        setXtensiveSearchData(data.results);
        setIsError(false);
      } else {
        console.log("Error searching multi movie");
        setIsError(true);
        setXtensiveSearchData([]);
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsError(true);
      setXtensiveSearchData([]);
    } finally {
      setLoading(false);
    }
  };

  const xTensiveSearchMovie = async () => {
    console.log("Error");
  };

  return {
    loading,
    isError,
    multiSearchMovie,
    xtensiveSearchData,
    xTensiveSearchMovie,
  };
};
