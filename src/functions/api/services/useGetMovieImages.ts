import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useState } from "react";
import { useMovieImagesStore } from "../store";
import { IMAGE_BASE_URL } from "@env";
import { appendBaseUrlToMovieImagesList } from "@src/helper/helper";

export const useGetMovieImages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { movieImageData, setMovieImageData } = useMovieImagesStore();
  const baseUrl = IMAGE_BASE_URL;

  const getMovieImages = async (movieId: number) => {
    setLoading(true);
    setIsError(false);

    try {
      setLoading(true);
      const { status, data } = await GetRequest(
        `${endpoint.GET_MOVIE_IMAGES}${movieId}/images`,
        header,
        {}
      );
      if (status === 200) {
        const movieImgList = appendBaseUrlToMovieImagesList(
          data.backdrops,
          baseUrl
        );
        setMovieImageData(movieImgList);
        setIsError(false);
      } else {
        console.log("Error getting movie images");
        setMovieImageData([]);
        setIsError(true);
      }
    } catch (err: any) {
      console.log(err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  return {
    isError,
    loading,
    getMovieImages,
    movieImageData,
  };
};
