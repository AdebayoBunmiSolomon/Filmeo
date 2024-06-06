import React from "react";
import { Screen } from "../Screen";
import { BottomTabBarScreenProps } from "@src/router/Types";
import { Header } from "@src/components/shared";

export const About = ({ navigation }: BottomTabBarScreenProps<"About">) => {
  return (
    <Screen>
      <Header backHeader={true} title='About' />
    </Screen>
  );
};
