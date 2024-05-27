import React from "react";
import { Screen } from "../Screen";
import { RootStackScreenProps } from "@src/router/Types";
import { Header } from "@src/components/shared";

export const About = ({ navigation }: RootStackScreenProps<"About">) => {
  return (
    <Screen>
      <Header backHeader={true} title='About' />
    </Screen>
  );
};
