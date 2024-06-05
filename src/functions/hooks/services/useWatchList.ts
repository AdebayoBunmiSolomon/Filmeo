import { useState } from "react";
import { getUserWatchList } from "@src/helper/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useWatchList = () => {
  const [watchList, setWatchList] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getWatchList = async () => {
    setLoading(true);
    try {
      const likedMovie = await getUserWatchList();
      setLoading(true);
      if (likedMovie.length > 0) {
        setWatchList(likedMovie);
        setLoading(false);
      } else {
        setWatchList([]);
        setLoading(false);
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchList = async (id: number) => {
    setLoading(true);
    try {
      setLoading(true);
      const likedMovieInWatchList = await getUserWatchList();
      const filteredData =
        likedMovieInWatchList &&
        likedMovieInWatchList.filter((movies: any) => movies.id !== id);
      setLoading(true);
      if (filteredData && filteredData.length > 0) {
        await AsyncStorage.setItem("@watchList", JSON.stringify(filteredData));
        await getUserWatchList();
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    watchList,
    getWatchList,
    removeFromWatchList,
  };
};
