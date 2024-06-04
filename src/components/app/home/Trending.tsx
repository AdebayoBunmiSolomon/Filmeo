import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetTrendingMovies } from "@src/functions/api/services";
import { layout, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNextPrev } from "@src/hooks/state";
import { MovieCard } from "@src/components/card";
import { NextButton, PrevButton } from "@src/common";

export const TrendingMovies = () => {
  const { theme } = useContext(ThemeContext);
  const { getTrendingMovies, loading, trendingMoviesData } =
    useGetTrendingMovies();
  const { prevBtn, nextBtn, pageNumber } = useNextPrev();

  useEffect(() => {
    getTrendingMovies(pageNumber);
  }, [pageNumber]);
  return (
    <View style={styles.container}>
      <AppText
        fontSemibold
        sizeMedium
        gray
        style={{
          marginBottom: layout.size10,
        }}>
        Trending Movies🔥
      </AppText>
      <View>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: layout.size30,
            }}>
            <Loader
              sizes='large'
              color={
                theme === "dark" ? colors.primaryColor2 : colors.primaryColor
              }
            />
          </View>
        ) : (
          <FlatList
            data={trendingMoviesData}
            keyExtractor={(items) => items.id.toString()}
            renderItem={({ item, index }) => (
              <View>
                <MovieCard items={item} index={index} />
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      <View style={styles.slideControlContainer}>
        <PrevButton prevFunc={() => prevBtn()} />
        <NextButton nextFunc={() => nextBtn()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: layout.size14,
  },
  slideControlContainer: {
    flexDirection: "row",
    gap: layout.size10,
    marginTop: verticalScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
});
