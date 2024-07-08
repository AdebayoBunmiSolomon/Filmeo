import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { includeAdult } from "@src/constant/data";
import { returnBooleanConstraintsForYesOrNoSelection } from "@src/helper/helper";
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
    setLoading(true);
    setIsError(false);

    try {
      const { data, status } = await GetRequest(
        `${endpoint.GET_MOVIE_BY_MULTI_SEARCH}query=${queryString}&include_adult=${includeAdult}&page=${pageNumber}`,
        header,
        {}
      );
      if (status === 200) {
        console.log(data.results);
        setXtensiveSearchData(data.results);
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

  useEffect(() => {
    getXtensiveSearch(queryStringVal, include_adult, pageNumber);
  }, [queryStringVal, include_adult, pageNumber]);

  return {
    getXtensiveSearch,
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
