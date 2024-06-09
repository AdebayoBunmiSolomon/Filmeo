import { LikeButton } from "@src/common";
import { Loader } from "@src/components/core";
import { DVH, moderateScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

type movieImageProps = {
  movieImageUri: string;
  movieId: number;
  likeMovieLoading: boolean;
  likeAMovieToWatchList: () => void;
};

export const MovieImage: React.FC<movieImageProps> = ({
  movieImageUri,
  movieId,
  likeMovieLoading,
  likeAMovieToWatchList,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: movieImageUri }}
        resizeMode='stretch'
        style={styles.img}>
        <View style={styles.likeBtnContainer}>
          {likeMovieLoading ? (
            <View style={styles.likeContainer}>
              <Loader
                sizes='small'
                color={
                  theme === "dark" ? colors.primaryColor2 : colors.primaryColor
                }
              />
            </View>
          ) : (
            <LikeButton
              id={Number(movieId)}
              onPressLike={() => {
                likeAMovieToWatchList();
              }}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DVH(55),
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  img: {
    height: "100%",
  },
  likeBtnContainer: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    alignItems: "flex-end",
    padding: moderateScale(20),
  },
  likeContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: moderateScale(10),
  },
});
