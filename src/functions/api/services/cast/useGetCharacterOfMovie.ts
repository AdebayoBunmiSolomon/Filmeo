import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useState } from "react";

export const useGetCharacterOfAMovie = () => {
  const [charLoading, setCharLoading] = useState<boolean>(false);
  const [isCharError, setIsCharError] = useState<boolean>(false);

  const getCharacterOfAMovie = async (castId: string) => {
    setCharLoading(true);
    setIsCharError(false);

    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_CHARACTER_OF_MOVIE}${castId}/movie_credits`,
        header,
        {}
      );
      if (status === 200) {
        console.log(data.cast);
        setIsCharError(false);
      } else {
        console.log("Error getting information");
        setIsCharError(true);
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsCharError(true);
    } finally {
      setCharLoading(false);
    }
  };

  return {
    getCharacterOfAMovie,
    charLoading,
    isCharError,
  };
};
