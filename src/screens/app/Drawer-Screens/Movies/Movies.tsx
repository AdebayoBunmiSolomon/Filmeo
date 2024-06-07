import React from "react";
import { Screen } from "../../../Screen";
import { View } from "react-native";
import { AppText } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";

export const Movies = ({ navigation }: DrawerStackScreenProps<"Movies">) => {
  return (
    <Screen>
      <View>
        <AppText fontBold sizeLarge>
          Movies Screen
        </AppText>
      </View>
    </Screen>
  );
};
