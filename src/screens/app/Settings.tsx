import React from "react";
import { Screen } from "../Screen";
import { Header } from "@src/components/shared";
import { RootStackScreenProps } from "@src/router/Types";

export const Settings = ({ navigation }: RootStackScreenProps<"Settings">) => {
  return (
    <Screen>
      <Header backHeader={true} title='Settings' />
    </Screen>
  );
};
