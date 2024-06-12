import { useState } from "react";
import { filterWatchList, getUserWatchList } from "@src/helper/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { likedMovieDataType } from "@src/types/types";
import { storageKey } from "@src/cache";

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
      const likedMovieInWatchList: likedMovieDataType[] =
        await getUserWatchList();
      if (!likedMovieInWatchList) {
        console.log("No movies found in watch list.");
        setLoading(false);
        return;
      }

      const filteredData = filterWatchList(likedMovieInWatchList, id);

      await AsyncStorage.setItem(
        storageKey.WATCH_LIST,
        JSON.stringify(filteredData)
      );
      setWatchList(filteredData);
    } catch (error) {
      console.error("Error removing movie from watch list:", error);
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
