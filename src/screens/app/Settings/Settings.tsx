import React from "react";
import { Screen } from "../../Screen";
import { Header } from "@src/components/shared";
import { BottomTabBarScreenProps } from "@src/router/Types";

export const Settings = ({
  navigation,
}: BottomTabBarScreenProps<"Settings">) => {
  return (
    <Screen>
      <Header backHeader={true} title='Settings' />
    </Screen>
  );
};
