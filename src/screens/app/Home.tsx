import React from "react";
import { Screen } from "../Screen";
import { Header } from "@src/components/shared";
import { RootStackScreenProps } from "@src/router/Types";

export const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  return (
    <Screen>
      <Header backHeader={false} title='Welcome Back' />
    </Screen>
  );
};
