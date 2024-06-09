import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert } from "react-native";
import { likedMovieDataType } from "@src/types/types";
import { getUserWatchList } from "@src/helper/helper";

export const useLikedMovie = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const likeAMovieToWatchList = async (
    id: number,
    title: string,
    videoImgUrl: string
  ) => {
    setLoading(true);
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
        setLoading(true);
        // If the movie is already liked, remove it from the likedMovie array
        const updatedMovies = likedMovieInWatchList.filter(
          (movie) => movie.id !== id
        );
        await AsyncStorage.setItem("@watchList", JSON.stringify(updatedMovies));
      } else {
        setLoading(true);
        // If the movie is not liked, add it to the likedMovie array
        const newMovie = {
          id: id,
          title: title,
          videoImgUrl: videoImgUrl,
        };
        await AsyncStorage.setItem(
          "@watchList",
          JSON.stringify([...likedMovieInWatchList, newMovie])
        );
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    likeAMovieToWatchList,
    loading,
  };
};
