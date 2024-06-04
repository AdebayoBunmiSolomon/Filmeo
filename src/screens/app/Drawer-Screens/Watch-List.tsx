import React from "react";
import { Screen } from "../../Screen";
import { View } from "react-native";
import { Header } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";

export const WatchList = ({}: DrawerStackScreenProps<"WatchList">) => {
  return (
    <Screen>
      <View>
        <Header backHeader={true} title='Watch List' />
      </View>
    </Screen>
  );
};
