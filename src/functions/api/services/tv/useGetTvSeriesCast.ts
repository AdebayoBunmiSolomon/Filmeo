import { useState } from "react";
import { IMAGE_BASE_URL } from "@env";
import { GetRequest } from "@src/api/request";
import { endpoint } from "@src/api/endpoints/endpoints";
import { header } from "@src/api/configuration/header";
import { appendBaseUrlToMovieCastList } from "@src/helper/helper";
import { useTvSeriesCastStore } from "../../store";

export const useGetTvSeriesCast = () => {
  const [tvSeriesCastLoading, setTvSeriesCastLoading] =
    useState<boolean>(false);
  const [isTvSeriesCastError, setIsTvSeriesCastError] =
    useState<boolean>(false);
  const { tvSeriesCastData, setTvSeriesCastData } = useTvSeriesCastStore();
  const baseUrl = IMAGE_BASE_URL;

  const getTvSeriesCast = async (tvSeriesId: number) => {
    setTvSeriesCastLoading(true);
    setIsTvSeriesCastError(false);

    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_CAST_OF_TV_SERIES}${tvSeriesId}/credits`,
        header,
        {}
      );
      if (status === 200) {
        const castData = appendBaseUrlToMovieCastList(data.cast, baseUrl);
        setTvSeriesCastData(castData);
        setIsTvSeriesCastError(false);
      } else {
        console.log("Error get movies cast");
        setIsTvSeriesCastError(true);
      }
    } catch (err: any) {
      console.log(err);
      setIsTvSeriesCastError(true);
    } finally {
      setTvSeriesCastLoading(false);
    }
  };

  return {
    getTvSeriesCast,
    tvSeriesCastLoading,
    isTvSeriesCastError,
    tvSeriesCastData,
  };
};
