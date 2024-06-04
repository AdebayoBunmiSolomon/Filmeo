import React from "react";
import { Screen } from "../Screen";
import { Header } from "@src/components/shared";
import { RootStackScreenProps } from "@src/router/Types";
import {
  GenreList,
  TrendingMovies,
  UpcomingMovies,
} from "@src/components/app/home";
import { ScrollView, View } from "react-native";
import { verticalScale } from "@src/resources";

export const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  return (
    <Screen>
      <Header backHeader={false} title='Welcome Back' />
      <GenreList setSelectedGenre={(value) => console.log(value)} />
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
