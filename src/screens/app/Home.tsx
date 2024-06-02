import React, { useEffect } from "react";
import { Screen } from "../Screen";
import { Header } from "@src/components/shared";
import { RootStackScreenProps } from "@src/router/Types";
import { useGetGenre } from "@src/functions/api/services";

export const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  const { genreData, loading, getMovieGenres } = useGetGenre();
  useEffect(() => {
    getMovieGenres();
  }, []);
  return (
    <Screen>
      <Header backHeader={false} title='Welcome Back' />
    </Screen>
  );
};
