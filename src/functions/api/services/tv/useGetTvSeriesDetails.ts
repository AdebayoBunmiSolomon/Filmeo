import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useState } from "react";
import { useTvSeriesStore } from "../../store";

export const useGetTvSeriesDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isTvSeriesHasError, setTvSeriesHasError] = useState<boolean>(false);
  const { tvSeriesData, setTvSeriesData } = useTvSeriesStore();
  const [tvSeriesVideoKey, setTvSeriesVideoKey] = useState<any[]>([]);

  const getYouTubeVideoId = async (tvSeriesId: number) => {
    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_TV_SERIES_YOUTUBE_KEY}${tvSeriesId}/videos`,
        header,
        {}
      );
      if (status === 200) {
        return data.results;
      } else {
        console.log("Error getting video id");
        return null;
      }
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  const getTvSeriesDetails = async (tvSeriesId: number) => {
    setLoading(true);
    setTvSeriesHasError(false);
    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_TV_SERIES_DETAILS}${tvSeriesId}`,
        header,
        {}
      );
      const videoKey = await getYouTubeVideoId(tvSeriesId);
      setLoading(true);
      if (status === 200) {
        // console.log("data", data);
        setTvSeriesVideoKey(videoKey);
        setTvSeriesData(data);
      } else {
        console.log("Error getting data");
        setTvSeriesHasError(true);
      }
    } catch (err: any) {
      console.log("Error", err);
      setTvSeriesHasError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    getTvSeriesDetails,
    loading,
    isTvSeriesHasError,
    tvSeriesData,
    tvSeriesVideoKey,
  };
};
