import { IMAGE_BASE_URL } from "@env";
import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { appendBaseUrlToMovieImagesList } from "@src/helper/helper";
import { useState } from "react";
import { useTvSeriesImageStore } from "../../store";

export const useGetTvSeriesImages = () => {
  const [tvSeriesImgLoading, setTvSeriesImgLoading] = useState<boolean>(false);
  const [isImgHasError, setIsImgHasError] = useState<boolean>(false);
  const { tvSeriesImageData, setTvSeriesImageData } = useTvSeriesImageStore();
  const baseUrl = IMAGE_BASE_URL;

  const getTvSeriesImages = async (tvSeriesId: number) => {
    setTvSeriesImgLoading(true);
    setIsImgHasError(false);

    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_TV_SERIES_IMAGES}${tvSeriesId}/images`,
        header,
        {}
      );
      if (status === 200) {
        const tvSeriesImgList = appendBaseUrlToMovieImagesList(
          data.backdrops,
          baseUrl
        );
        setTvSeriesImageData(tvSeriesImgList);
      } else {
        console.log("Error getting data");
        setTvSeriesImageData([]);
        setIsImgHasError(true);
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsImgHasError(true);
    } finally {
      setTvSeriesImgLoading(false);
    }
  };

  return {
    getTvSeriesImages,
    isImgHasError,
    tvSeriesImgLoading,
    tvSeriesImageData,
  };
};
