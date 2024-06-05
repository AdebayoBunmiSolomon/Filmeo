import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLikedMovieStore } from "../store";
import { useState } from "react";
import { Alert } from "react-native";

export const useLikedMovie = () => {
  const { likedMovie, setLikedMovie } = useLikedMovieStore();
  const [loading, setLoading] = useState<boolean>(false);

  const likeAMovieToWatchList = async (
    id: number,
    title: string,
    videoImgUrl: string
  ) => {
    setLoading(true);
    try {
      setLoading(true);
      if (likedMovie.length === 5) {
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
      } else {
        setLoading(true);
        const isMovieExist = likedMovie.some((items) => items.id === id);
        setLoading(true);
        if (isMovieExist) {
          setLoading(true);
          // If the movie is already liked, remove it from the likedMovie array
          const updatedMovies = likedMovie.filter((movie) => movie.id !== id);
          setLikedMovie(updatedMovies);
          await AsyncStorage.setItem(
            "@watchList",
            JSON.stringify(updatedMovies)
          );
        } else {
          setLoading(true);
          // If the movie is not liked, add it to the likedMovie array
          const newMovie = {
            id: id,
            title: title,
            videoImgUrl: videoImgUrl,
          };
          setLikedMovie([...likedMovie, newMovie]);
          await AsyncStorage.setItem(
            "@watchList",
            JSON.stringify([...likedMovie, newMovie])
          );
        }
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    likeAMovieToWatchList,
    likedMovie,
    loading,
  };
};
