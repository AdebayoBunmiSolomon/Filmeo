import React from "react";
import { Screen } from "../Screen";
import { Header } from "@src/components/shared";
import { RootStackScreenProps } from "@src/router/Types";
import { GenreList } from "@src/components/app/home";

export const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  return (
    <Screen>
      <Header backHeader={false} title='Welcome Back' />
      <GenreList setSelectedGenre={(value) => console.log(value)} />
    </Screen>
  );
};
