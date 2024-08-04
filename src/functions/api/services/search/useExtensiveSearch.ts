import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { includeAdult } from "@src/constant/data";
import {
  filterNonMediaTypes,
  returnBooleanConstraintsForYesOrNoSelection,
} from "@src/helper/helper";
import { useNextPrev } from "@src/hooks/state";
import { useEffect, useState } from "react";
import { useXtensiveMovieSearchStore } from "../../store";

export const useExtensiveSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { xtensiveSearchData, setXtensiveSearchData } =
    useXtensiveMovieSearchStore();
  const [queryStringVal, setQueryStringVal] = useState<string>("");
  const { pageNumber, nextBtn, prevBtn, setPageNumber } = useNextPrev();
  const [adultSelection, setAdultSelection] = useState<string>(
    includeAdult[0].name
  );

  const include_adult =
    returnBooleanConstraintsForYesOrNoSelection(adultSelection);

  const getXtensiveSearch = async (
    queryString: string,
    includeAdult: boolean,
    pageNumber: number
  ) => {
    let filteredMovie;
    setLoading(true);
    setIsError(false);

    try {
      const { data, status } = await GetRequest(
        `${endpoint.GET_MOVIE_BY_MULTI_SEARCH}query=${queryString}&include_adult=${includeAdult}&page=${pageNumber}`,
        header,
        {}
      );
      filteredMovie = filterNonMediaTypes(data.results);
      if (status === 200 && filteredMovie) {
        setXtensiveSearchData(filteredMovie);
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const getXtensiveSearchOfMovieFromNotification = async (
    queryString: string,
    includeAdult: boolean,
    pageNumber: number
  ) => {
    try {
      let filteredMovie;
      setLoading(true);
      setIsError(false);

      const { data, status } = await GetRequest(
        `${endpoint.GET_MOVIE_BY_MULTI_SEARCH}query=${queryString}&include_adult=${includeAdult}&page=${pageNumber}`,
        header,
        {}
      );
      filteredMovie = filterNonMediaTypes(data.results);
      if (status === 200 && filteredMovie) {
        console.log("Filtered movie", filteredMovie);
        setIsError(false);
        return {
          mediaTypeOfMovie: filteredMovie[0].media_type,
          id: filteredMovie[0].id,
        };
      } else {
        console.log("Error getting movie or tv info");
        setIsError(true);
        return {
          mediaTypeOfMovie: undefined,
          id: undefined,
        };
      }
    } catch (err: any) {
      console.log("Error", err);
      return {
        mediaTypeOfMovie: undefined,
        id: undefined,
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getXtensiveSearch(queryStringVal, include_adult, pageNumber);
  }, [queryStringVal, include_adult, pageNumber]);

  return {
    getXtensiveSearch,
    getXtensiveSearchOfMovieFromNotification,
    loading,
    isError,
    xtensiveSearchData,
    queryStringVal,
    setQueryStringVal,
    pageNumber,
    setPageNumber,
    nextBtn,
    prevBtn,
    setAdultSelection,
  };
};
