import React from "react";
import { Screen } from "../../../Screen";
import { View } from "react-native";
import { AppText } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";

export const Ratings = ({ navigation }: DrawerStackScreenProps<"Ratings">) => {
  return (
    <Screen>
      <View>
        <AppText fontBold sizeLarge>
          Ratings Screen
        </AppText>
      </View>
    </Screen>
  );
};
