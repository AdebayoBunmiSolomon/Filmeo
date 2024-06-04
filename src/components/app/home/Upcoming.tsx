import { NextButton, PrevButton } from "@src/common";
import { MovieCard } from "@src/components/card";
import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetUpcomingMovies } from "@src/functions/api/services";
import { useNextPrev } from "@src/hooks/state";
import { layout, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

export const UpcomingMovies: React.FC<{}> = () => {
  const { theme } = useContext(ThemeContext);
  const { getUpcomingMovies, upcomingMoviesData, loading } =
    useGetUpcomingMovies();
  const { prevBtn, nextBtn, pageNumber } = useNextPrev();

  useEffect(() => {
    getUpcomingMovies(pageNumber);
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
        Upcoming Movies🔥
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
            data={upcomingMoviesData}
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
