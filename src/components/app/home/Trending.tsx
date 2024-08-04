import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetTrendingMovies } from "@src/functions/api/services/movies";
import { layout, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { MovieCard } from "@src/components/card";
import { ListButton } from "@src/common";
import { trendingMovieTimeWindow } from "@src/constant/data";
import { useMovieCardClick } from "@src/components/core/services";

export const TrendingMovies: React.FC<{}> = () => {
  const { theme } = useContext(ThemeContext);
  const { loading, trendingMoviesData, setTimeWindow } = useGetTrendingMovies();
  const { movieCardClick } = useMovieCardClick();

  return (
    <View style={styles.container}>
      <View style={styles.timeWindowContainer}>
        <AppText
          fontSemibold
          sizeMedium
          gray
          style={{
            marginBottom: layout.size10,
          }}>
          Trending Movies🔥
        </AppText>
        <ListButton
          data={trendingMovieTimeWindow}
          setSelectedItem={(value) => setTimeWindow(value)}
        />
      </View>

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
              <MovieCard
                items={item}
                index={index}
                viewMore={() => movieCardClick(item.id)}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            windowSize={2}
            updateCellsBatchingPeriod={100}
          />
        )}
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
  timeWindowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
