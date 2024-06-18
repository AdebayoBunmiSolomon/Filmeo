import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NextButton, PrevButton } from "@src/common";
import { MovieCard } from "@src/components/card";
import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetUpcomingMovies } from "@src/functions/api/services/movies";
import { layout, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

export const UpcomingMovies: React.FC<{}> = () => {
  const navigation: NavigationProp<any> = useNavigation();
  const { theme } = useContext(ThemeContext);
  const { upcomingMoviesData, loading, prevBtn, nextBtn } =
    useGetUpcomingMovies();

  const movieCardClick = (id: number) => {
    navigation.navigate("ViewMore", {
      movieId: id,
    });
  };

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
              <MovieCard
                items={item}
                index={index}
                viewMore={() => movieCardClick(item.id)}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              loading ? (
                <ActivityIndicator size='large' color='#0000ff' />
              ) : null
            }
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
