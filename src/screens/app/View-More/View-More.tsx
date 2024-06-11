import { RootStackScreenProps } from "@src/router/Types";
import React, { useContext, useEffect } from "react";
import { Screen } from "@src/screens/Screen";
import { StyleSheet, View, ScrollView } from "react-native";
import { AppText, Header } from "@src/components/shared";
import { useGetMovieDetails } from "@src/functions/api/services/movies";
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
  MovieTopDetails,
  VideoThriller,
} from "@src/components/app/view-more";

export const ViewMore = ({ route }: RootStackScreenProps<"ViewMore">) => {
  const { theme } = useContext(ThemeContext);
  const { movieId } = route.params;
  const { movieDetails, getMovieDetails, loading, isError, movieVideoKey } =
    useGetMovieDetails();
  const { likeAMovieToWatchList, likeMovieLoading } = useLikedMovie();
  useEffect(() => {
    getMovieDetails(movieId);
  }, [movieId]);
  return (
    <Screen>
      <>
        <View style={styles.headerContainer}>
          <Header title='View More' backHeader />
        </View>
        {loading ? (
          <View style={styles.container}>
            <Loader
              sizes='large'
              color={
                theme === "dark" ? colors.primaryColor2 : colors.primaryColor
              }
            />
          </View>
        ) : isError ? (
          <Error
            onRefresh={() => getMovieDetails(movieId)}
            errTitle='Error loading movie detail'
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
            }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: verticalScale(50),
              }}
              showsVerticalScrollIndicator={false}>
              <MovieImage
                movieImageUri={`${IMAGE_BASE_URL}${movieDetails.poster_path}`}
                movieId={movieId}
                likeMovieLoading={likeMovieLoading}
                likeAMovieToWatchList={() => {
                  likeAMovieToWatchList(
                    Number(movieId),
                    movieDetails.title,
                    movieDetails.poster_path
                  );
                }}
              />
              <MovieTopDetails movieDetails={movieDetails} />
              <View style={styles.overViewContainer}>
                <AppText fontRegular sizeBody gray style={styles.overViewText}>
                  {movieDetails.overview}
                </AppText>
              </View>
              <View style={styles.movieCastAndImageContainer}>
                <MovieImageList movieId={movieId} />
                <MovieCast movieId={movieId} />
              </View>
            </ScrollView>
            <VideoThriller videoKey={movieVideoKey} />
          </View>
        )}
      </>
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
