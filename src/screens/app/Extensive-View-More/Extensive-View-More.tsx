import { RootStackScreenProps } from "@src/router/Types";
import React, { useContext, useEffect } from "react";
import { Screen } from "@src/screens/Screen";
import { ScrollView, StyleSheet, View } from "react-native";
import { AppText, Header } from "@src/components/shared";
import { Loader } from "@src/components/core";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Error, ListButton } from "@src/common";
import { moderateScale, verticalScale } from "@src/resources";
import { useIsFocused } from "@react-navigation/native";
import {
  useGetTvSeriesDetails,
  useGetTvSeriesImages,
  useGetTvSeriesReviews,
} from "@src/functions/api/services/tv";
import {
  MovieCast,
  MovieImage,
  MovieImageList,
  MovieTopDetails,
  SeriesReview,
  SeriesVideoThriller,
} from "@src/components/app/view-more";
import { useLikedMovie } from "@src/functions/hooks/services";
import { IMAGE_BASE_URL } from "@env";
import { useGetTvSeriesCast } from "@src/functions/api/services/tv/useGetTvSeriesCast";
import {
  MovieNetworks,
  MovieOtherInfo,
} from "@src/components/app/view-more/sub-components";
import { AntDesign } from "@expo/vector-icons";

export const ExtensiveViewMore = ({
  route,
}: RootStackScreenProps<"ExtensiveViewMore">) => {
  const { theme } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const { tvSeriesId } = route.params;
  const {
    isTvSeriesHasError,
    loading,
    getTvSeriesDetails,
    tvSeriesData,
    tvSeriesVideoKey,
  } = useGetTvSeriesDetails();
  const {
    getTvSeriesImages,
    isImgHasError,
    tvSeriesImgLoading,
    tvSeriesImageData,
  } = useGetTvSeriesImages();
  const {
    tvSeriesCastData,
    isTvSeriesCastError,
    tvSeriesCastLoading,
    getTvSeriesCast,
  } = useGetTvSeriesCast();
  const { likeAMovieToWatchList, likeMovieLoading } = useLikedMovie();
  const { tvSeriesReviewData } = useGetTvSeriesReviews();

  useEffect(() => {
    if (isFocused && tvSeriesId) {
      getTvSeriesDetails(tvSeriesId);
      getTvSeriesImages(tvSeriesId);
      getTvSeriesCast(tvSeriesId);
    }
  }, [isFocused, tvSeriesId]);

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <Header title='Series Details' backHeader />
      </View>
      {isTvSeriesHasError ? (
        <Error
          onRefresh={() => getTvSeriesDetails(tvSeriesId)}
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
                tvSeriesReviewData && tvSeriesReviewData.length !== 0
                  ? verticalScale(20)
                  : verticalScale(70),
            }}
            showsVerticalScrollIndicator={false}>
            <MovieImage
              movieImageUri={`${IMAGE_BASE_URL}${tvSeriesData.poster_path}`}
              movieId={tvSeriesId}
              likeMovieLoading={likeMovieLoading}
              likeAMovieToWatchList={() => {
                likeAMovieToWatchList(
                  Number(tvSeriesId),
                  tvSeriesData.name,
                  tvSeriesData.poster_path
                );
              }}
            />
            <MovieTopDetails movieDetails={tvSeriesData} />
            <View style={styles.overViewContainer}>
              <AppText fontRegular sizeBody gray style={styles.overViewText}>
                {tvSeriesData.overview}
              </AppText>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: moderateScale(5),
              }}>
              <AppText fontRegular sizeBody gray>
                Vote Count:
              </AppText>
              <AntDesign
                name='like2'
                color={
                  theme === "dark" ? colors.primaryColor2 : colors.primaryColor
                }
                size={moderateScale(20)}
              />
              <AppText fontBold mainColor>
                |
              </AppText>
              <AppText fontRegular mainColor>
                {tvSeriesData.vote_count}
              </AppText>
            </View>
            {tvSeriesData.networks && tvSeriesData.networks.length !== 0 && (
              <MovieNetworks
                imgData={tvSeriesData.networks}
                title='Movie Networks'
              />
            )}
            <MovieOtherInfo
              numberOfEpisodes={tvSeriesData.number_of_episodes}
              numberOfSeasons={tvSeriesData.number_of_seasons}
              productionCountries={tvSeriesData.production_countries}
              spokenLanguages={tvSeriesData.spoken_languages}
            />
            <ListButton
              setSelectedItem={(value) => {
                console.log(value);
              }}
              loading={loading}
              data={tvSeriesData.seasons}
              showHeaderTitle
            />
            <View style={styles.movieCastAndImageContainer}>
              <MovieImageList
                movieImageData={tvSeriesImageData}
                isError={isImgHasError}
                loading={tvSeriesImgLoading}
              />
              <MovieCast
                movieCastData={tvSeriesCastData}
                isError={isTvSeriesCastError}
                loading={tvSeriesCastLoading}
              />
            </View>
          </ScrollView>
          <SeriesReview tvSeriesId={tvSeriesId} />
          <SeriesVideoThriller videoKey={tvSeriesVideoKey} />
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
});
