import { Header } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";
import React from "react";
import { Screen } from "@src/screens/Screen";

export const ExtensiveSearch = ({
  navigation,
}: DrawerStackScreenProps<"ExtensiveSearch">) => {
  return (
    <>
      <Screen>
        <Header title='Extensive Search' backHeader />
      </Screen>
    </>
  );
};
