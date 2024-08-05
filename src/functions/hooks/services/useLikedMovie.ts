import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert } from "react-native";
import { likedMovieDataType } from "@src/types/types";
import { getUserWatchList } from "@src/helper/helper";
import { storageKey } from "@src/cache";

export const useLikedMovie = () => {
  const [likeMovieLoading, setLikeMovieLoading] = useState<boolean>(false);

  const likeAMovieToWatchList = async (
    id: number,
    title: string,
    videoImgUrl: string
  ) => {
    setLikeMovieLoading(true);
    try {
      const likedMovieInWatchList: likedMovieDataType[] =
        await getUserWatchList();
      if (likedMovieInWatchList.length === 5) {
        Alert.alert(
          "Information ⚠️",
          "Watch-list limit reached. You can only have 5 watch list 🚨",
          [
            {
              text: "Ok",
              onPress: () => {
                console.log("Ok Pressed");
              },
            },
          ]
        );
        return;
      }
      const isMovieExist = likedMovieInWatchList.some(
        (items) => items.id === id
      );
      if (isMovieExist) {
        setLikeMovieLoading(true);
        // If the movie is already liked, remove it from the likedMovie array
        const updatedMovies = likedMovieInWatchList.filter(
          (movie) => movie.id !== id
        );
        await AsyncStorage.setItem(
          storageKey.WATCH_LIST,
          JSON.stringify(updatedMovies)
        );
      } else {
        setLikeMovieLoading(true);
        // If the movie is not liked, add it to the likedMovie array
        const newMovie = {
          id: id,
          title: title,
          videoImgUrl: videoImgUrl,
        };
        await AsyncStorage.setItem(
          storageKey.WATCH_LIST,
          JSON.stringify([...likedMovieInWatchList, newMovie])
        );
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLikeMovieLoading(false);
    }
  };

  return {
    likeAMovieToWatchList,
    likeMovieLoading,
  };
};
