import { IMAGE_BASE_URL } from "@env";
import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetMovieReviews } from "@src/functions/api/services/movies";
import { convertDateTimeISOtoHTMLDate } from "@src/helper/helper";
import { DVH, DVW, layout, moderateScale, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

type movieReviewProps = {
  movieId: number;
};

export const MovieReview: React.FC<movieReviewProps> = ({ movieId }) => {
  const { movieReviewData, getMovieReviews, loading, isError } =
    useGetMovieReviews();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getMovieReviews(movieId);
  }, []);
  return (
    <>
      {isError ? (
        <View>
          <AppText>Error occurred.</AppText>
          <TouchableOpacity onPress={() => getMovieReviews(movieId)}>
            <AppText>click to refresh</AppText>
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <Loader
          sizes='small'
          color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
        />
      ) : (
        <View>
          <AppText fontSemibold sizeMedium black>
            Reviews
          </AppText>
          <FlatList
            data={movieReviewData && movieReviewData}
            style={styles.flatListContainer}
            keyExtractor={(items, index) => items.id + index.toString()}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.itemsContainer}>
                <View style={styles.topItemsContentContainer}>
                  <View style={styles.imageContainer}>
                    {item.author_details.avatar_path ? (
                      <Image
                        source={{
                          uri: `${IMAGE_BASE_URL}${item.author_details.avatar_path}`,
                        }}
                        resizeMode='cover'
                        style={styles.avatar}
                      />
                    ) : (
                      <Image
                        source={require("@src/assets/images/experience.png")}
                        resizeMode='cover'
                        style={styles.avatar}
                      />
                    )}
                  </View>
                  <View style={styles.itemName}>
                    <AppText fontRegular sizeSmall mainColor>
                      {item.author}
                    </AppText>
                    <AppText fontSemibold sizeSmall gray>
                      {"@" + item.author_details.username}
                    </AppText>
                  </View>
                </View>
                <AppText
                  fontLight
                  sizeSmall
                  gray
                  style={{
                    textAlign: "justify",
                  }}>
                  {item.content}
                </AppText>
                <AppText fontBold sizeSmall mainColor>
                  Posted - {convertDateTimeISOtoHTMLDate(item.created_at)}
                </AppText>
              </View>
            )}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={2}
            updateCellsBatchingPeriod={100}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    height: DVH(40),
    borderRadius: moderateScale(10),
  },
  itemsContainer: {
    width: "100%",
    paddingVertical: verticalScale(20),
    height: DVH(40),
    backgroundColor: colors.lightGray,
    paddingHorizontal: moderateScale(10),
  },
  itemName: {
    flexDirection: "row",
    gap: moderateScale(5),
  },
  imageContainer: {
    width: DVW(8),
    height: DVH(4),
    borderRadius: Math.min(DVW(8), DVH(5)) / 2, // Ensure borderRadius is half of the smallest dimension
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: {
    width: DVW(8),
    height: DVH(5),
    borderRadius: Math.min(DVW(8), DVH(5)) / 2, // Ensure borderRadius is half of the smallest dimension
  },
  topItemsContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  textContainer: {
    // flexDirection: "column",
    // gap: moderateScale(10),
  },
});
