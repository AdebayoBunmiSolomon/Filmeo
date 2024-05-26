import React from "react";
import { Screen } from "../Screen";
import { View } from "react-native";
import { AppText } from "@src/components/shared";
import { RootStackScreenProps } from "@src/router/Types";

export const Settings = ({ navigation }: RootStackScreenProps<"Settings">) => {
  return (
    <Screen>
      <View>
        <AppText fontBold sizeLarge>
          Settings Screen
        </AppText>
      </View>
    </Screen>
  );
};
