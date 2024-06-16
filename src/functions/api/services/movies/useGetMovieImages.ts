import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useState } from "react";
import { useMovieImagesStore } from "../../store";
import { IMAGE_BASE_URL } from "@env";
import { appendBaseUrlToMovieImagesList } from "@src/helper/helper";

export const useGetMovieImages = () => {
  const [movieImageLoading, setMovieImageLoading] = useState<boolean>(false);
  const [isMovieError, setIsMovieError] = useState<boolean>(false);
  const { movieImageData, setMovieImageData } = useMovieImagesStore();
  const baseUrl = IMAGE_BASE_URL;

  const getMovieImages = async (movieId: number) => {
    setMovieImageLoading(true);
    setIsMovieError(false);

    try {
      setMovieImageLoading(true);
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
        setIsMovieError(false);
      } else {
        console.log("Error getting movie images");
        setMovieImageData([]);
        setIsMovieError(true);
      }
    } catch (err: any) {
      console.log(err);
      setIsMovieError(true);
    } finally {
      setMovieImageLoading(false);
    }
  };
  return {
    isMovieError,
    movieImageLoading,
    getMovieImages,
    movieImageData,
  };
};
