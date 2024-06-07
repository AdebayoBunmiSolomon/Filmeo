import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetTrendingMovies } from "@src/functions/api/services";
import { layout, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { MovieCard } from "@src/components/card";
import { ListButton } from "@src/common";
import { trendingMovieTimeWindow } from "@src/constant/data";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const TrendingMovies: React.FC<{}> = () => {
  const navigation: NavigationProp<any> = useNavigation();
  const { theme } = useContext(ThemeContext);
  const { getTrendingMovies, loading, trendingMoviesData } =
    useGetTrendingMovies();
  const [timeWindow, setTimeWindow] = useState<string>(
    trendingMovieTimeWindow[0].name
  );

  useEffect(() => {
    getTrendingMovies(timeWindow);
  }, [timeWindow]);
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
              <View>
                <MovieCard
                  items={item}
                  index={index}
                  viewMore={() =>
                    navigation.navigate("ViewMore", {
                      movieId: Number(item.id),
                    })
                  }
                />
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
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
