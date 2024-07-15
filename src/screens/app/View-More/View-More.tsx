import { RootStackScreenProps } from "@src/router/Types";
import React, { useContext, useEffect } from "react";
import { Screen } from "@src/screens/Screen";
import { StyleSheet, View, ScrollView } from "react-native";
import { AppText, BrowserButton, Header } from "@src/components/shared";
import {
  useGetMovieCast,
  useGetMovieDetails,
  useGetMovieImages,
  useGetMovieReviews,
} from "@src/functions/api/services/movies";
import { Loader, CountNShare } from "@src/components/core";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Error } from "@src/common";
import { IMAGE_BASE_URL } from "@env";
import { DVW, verticalScale } from "@src/resources";
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
import {
  MovieNetworks,
  MovieOtherInfo,
} from "@src/components/app/view-more/sub-components";

export const ViewMore = ({ route }: RootStackScreenProps<"ViewMore">) => {
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
  const { movieReviewData } = useGetMovieReviews();

  useEffect(() => {
    if (isFocused && movieId) {
      getMovieDetails(movieId);
      getMovieImages(movieId);
      getMovieCast(movieId);
    }
  }, [isFocused, movieId]);

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <Header title='View More' backHeader />
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
        <View
          style={{
            width: "100%",
            height: "100%",
          }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom:
                movieReviewData && movieReviewData.length !== 0
                  ? verticalScale(20)
                  : verticalScale(70),
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
            <View style={styles.browserNShareContainer}>
              <BrowserButton url={movieDetails.homepage} />
              <CountNShare item={movieDetails} />
            </View>
            {movieDetails.production_companies &&
              movieDetails.production_companies.length !== 0 && (
                <MovieNetworks
                  imgData={movieDetails.production_companies}
                  title='Prod. Companies'
                />
              )}
            <MovieOtherInfo
              numberOfEpisodes={"0"}
              numberOfSeasons={"0"}
              productionCountries={[]}
              spokenLanguages={[]}
            />
            <View style={styles.movieCastAndImageContainer}>
              <MovieImageList
                movieImageData={movieImageData}
                isError={isMovieError}
                loading={movieImageLoading}
              />
              <MovieCast
                movieCastData={movieCastData}
                isError={isMovieCastError}
                loading={movieCastLoading}
              />
            </View>
          </ScrollView>
          <MovieReview movieId={movieId} />
          <VideoThriller videoKey={movieVideoKey} />
        </View>
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
  browserNShareContainer: {
    flexDirection: "row",
    paddingHorizontal: DVW(2),
    backgroundColor: colors.lightGray,
    marginTop: verticalScale(-10),
    justifyContent: "space-between",
    alignItems: "center",
  },
});
