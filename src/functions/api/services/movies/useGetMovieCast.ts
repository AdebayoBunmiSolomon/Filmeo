import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { appendBaseUrlToMovieCastList } from "@src/helper/helper";
import { useState } from "react";
import { IMAGE_BASE_URL } from "@env";
import { useMovieCastStore } from "../../store/useMovieCastStore";

export const useGetMovieCast = () => {
  const [movieCastLoading, setMovieCastLoading] = useState<boolean>(false);
  const [isMovieCastError, setIsMovieCastError] = useState<boolean>(false);
  const { movieCastData, setMovieCastData } = useMovieCastStore();
  const baseUrl = IMAGE_BASE_URL;

  const getMovieCast = async (movieId: number) => {
    setMovieCastLoading(true);
    setIsMovieCastError(false);

    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_CAST_OF_MOVIES}${movieId}/credits`,
        header,
        {}
      );
      if (status === 200) {
        const castData = appendBaseUrlToMovieCastList(data.cast, baseUrl);
        setMovieCastData(castData);
        console.log(data);
        setIsMovieCastError(false);
      } else {
        console.log("Error get movies cast");
        setIsMovieCastError(true);
      }
    } catch (err: any) {
      console.log(err);
      setIsMovieCastError(true);
    } finally {
      setMovieCastLoading(false);
    }
  };

  return {
    movieCastLoading,
    isMovieCastError,
    getMovieCast,
    movieCastData,
  };
};
