import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useNextPrev } from "@src/hooks/state";
import { useState } from "react";
import { useSearchPeopleStore } from "../../store";

export const useSearchPeople = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { nextBtn, prevBtn, pageNumber } = useNextPrev();
  const { setPeopleData, peopleData } = useSearchPeopleStore();

  const getPersonData = async (personId: string) => {
    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_CHARACTER_OF_PERSON}${personId}`,
        header,
        {}
      );
      if (status === 200) {
        return data;
      } else {
        console.log("Error getting character of a movie");
        return null;
      }
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  const searchPeople = async (queryString: string) => {
    setLoading(true);
    setIsError(false);
    console.log(queryString);
    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_PERSONS_BY_SEARCH}query=${queryString}&page=${pageNumber}`,
        header,
        {}
      );
      if (status === 200) {
        console.log(data.results);
        setPeopleData(data.results);
        setIsError(false);
      } else {
        console.log("Error getting data");
        setPeopleData([]);
        setIsError(true);
      }
    } catch (err: any) {
      console.log("Error", err);
      setPeopleData([]);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    isError,
    searchPeople,
    pageNumber,
    nextBtn,
    prevBtn,
    peopleData,
    getPersonData,
  };
};
