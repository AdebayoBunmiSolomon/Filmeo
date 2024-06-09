import React, { useEffect } from "react";
import { Screen } from "../../Screen";
import { Header } from "@src/components/shared";
import { BottomTabBarScreenProps } from "@src/router/Types";
import { TrendingMovies, UpcomingMovies } from "@src/components/app/home";
import { ScrollView, View } from "react-native";
import { verticalScale } from "@src/resources";
import { useGetGenre } from "@src/functions/api/services";
import { Error, ListButton } from "@src/common";

export const Home = ({ navigation }: BottomTabBarScreenProps<"Home">) => {
  const { genreData, loading, getMovieGenres, isError } = useGetGenre();

  useEffect(() => {
    getMovieGenres();
  }, []);
  return (
    <Screen>
      <Header backHeader={false} title='Hi,' showUsername showRightIcon />
      {isError ? (
        <Error
          onRefresh={() => {
            getMovieGenres();
          }}
          errTitle='Error refreshing genre list'
          refreshBtnTitle='Click to refresh'
        />
      ) : (
        <ListButton
          setSelectedItem={(value) => {}}
          loading={loading}
          data={genreData}
          showHeaderTitle
          headerTitle='Genres'
        />
      )}
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View
          style={{
            paddingBottom: verticalScale(75),
          }}>
          <TrendingMovies />
          <UpcomingMovies />
        </View>
      </ScrollView>
    </Screen>
  );
};
