import { AppText } from "@src/components/shared";
import { getYearFromDateValue } from "@src/helper/helper";
import { moderateScale, verticalScale } from "@src/resources";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type movieTopDetailsProps = {
  movieDetails: any;
};

export const MovieTopDetails: React.FC<movieTopDetailsProps> = ({
  movieDetails,
}) => {
  const lengthOfMovieGenres: number =
    movieDetails && movieDetails.genres.length - 1;
  console.log(lengthOfMovieGenres);
  return (
    <>
      <View style={styles.movieDetailsTopContainer}>
        <AppText fontBold sizeLarge style={styles.movieTextTitle}>
          {movieDetails.title}
        </AppText>
        <View style={styles.movieDetailsTextContainer}>
          <AppText fontSemibold sizeSmall gray>
            {movieDetails.status}&nbsp;&nbsp;&nbsp;|
          </AppText>
          <AppText fontSemibold sizeSmall gray>
            {getYearFromDateValue(String(movieDetails.release_date))}
            &nbsp;&nbsp;&nbsp;|
          </AppText>
          <AppText fontSemibold sizeSmall gray>
            {movieDetails.runtime}mins&nbsp;&nbsp;&nbsp;
          </AppText>
        </View>
        <View style={styles.mainScrollContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {movieDetails.genres &&
              movieDetails.genres.map(
                (items: { id: number; name: string }, index: number) => (
                  <AppText key={index} fontSemibold sizeSmall mainColor>
                    {items.name}&nbsp;&nbsp;&nbsp;
                    {index === lengthOfMovieGenres ? "" : "|"}
                  </AppText>
                )
              )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  movieDetailsTopContainer: {
    maxWidth: "80%",
    alignSelf: "center",
    gap: moderateScale(10),
    marginTop: verticalScale(10),
  },
  movieDetailsTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: moderateScale(10),
  },
  movieTextTitle: {
    maxWidth: "100%",
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(10),
  },
  mainScrollContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
