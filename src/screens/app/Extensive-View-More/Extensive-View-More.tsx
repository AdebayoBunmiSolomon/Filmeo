import { RootStackScreenProps } from "@src/router/Types";
import React, { useContext, useEffect } from "react";
import { Screen } from "@src/screens/Screen";
import { StyleSheet, View, ScrollView } from "react-native";
import { AppText, Header } from "@src/components/shared";
import {
  useGetMovieCast,
  useGetMovieDetails,
  useGetMovieImages,
} from "@src/functions/api/services/movies";
import { Loader } from "@src/components/core";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Error } from "@src/common";
import { IMAGE_BASE_URL } from "@env";
import { verticalScale } from "@src/resources";
import { useLikedMovie } from "@src/functions/hooks/services";
import {
  MovieCast,
  MovieImage,
  MovieImageList,
  MovieReview,
  MovieTopDetails,
  VideoThriller,
} from "@src/components/app/view-more";
import { useIsFocused } from "@react-navigation/native";

export const ExtensiveViewMore = ({
  route,
}: RootStackScreenProps<"ExtensiveViewMore">) => {
  const { theme } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const { movieId } = route.params;
  const { movieDetails, getMovieDetails, loading, isError, movieVideoKey } =
    useGetMovieDetails(); //get movie details
  const { getMovieImages, isMovieError, movieImageLoading, movieImageData } =
    useGetMovieImages(); // get movie images
  const { isMovieCastError, movieCastLoading, getMovieCast, movieCastData } =
    useGetMovieCast(); // get movie casts
  const { likeAMovieToWatchList, likeMovieLoading } = useLikedMovie();
  // useEffect(() => {
  //   if (isFocused && movieId) {
  //     getMovieDetails(movieId);
  //     getMovieImages(movieId);
  //     getMovieCast(movieId);
  //   }
  // }, [isFocused, movieId]);

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <Header title='Extensive View More' backHeader />
      </View>
      {isError ? (
        <Error
          onRefresh={() => getMovieDetails(movieId)}
          errTitle='Error loading movie detail'
        />
      ) : loading ? (
        <View style={styles.container}>
          <Loader
            sizes='large'
            color={
              theme === "dark" ? colors.primaryColor2 : colors.primaryColor
            }
          />
        </View>
      ) : (
        <AppText>Extensive search</AppText>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: verticalScale(10),
  },
  container: {
    width: "100%",
    height: "100%",
  },
  overViewContainer: {
    paddingVertical: verticalScale(20),
  },
  overViewText: {
    textAlign: "justify",
  },
  movieCastAndImageContainer: {
    gap: verticalScale(10),
  },
});
