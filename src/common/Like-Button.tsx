import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { getUserWatchList } from "@src/helper/helper";
import { layout } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { likedMovieDataType } from "@src/types/types";
import React, { useEffect, useState } from "react";

type likeButtonProps = {
  id: number;
};

export const LikeButton: React.FC<likeButtonProps> = ({ id }) => {
  const [isMovieLiked, setIsMovieLiked] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const checkIsMovieLiked = async (id: number) => {
      const likedMovieInWatchList: likedMovieDataType[] =
        await getUserWatchList();
      const isMovieLikedInWatchList = likedMovieInWatchList.some(
        (movies) => movies.id === id
      );
      setIsMovieLiked(isMovieLikedInWatchList);
    };
    checkIsMovieLiked(id);
  }, [isFocused]);

  return (
    <>
      <AntDesign
        name={`${isMovieLiked ? "heart" : "hearto"}`}
        size={layout.size26}
        color={colors.white}
      />
    </>
  );
};
