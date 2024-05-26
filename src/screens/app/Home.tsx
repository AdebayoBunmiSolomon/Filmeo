import React from "react";
import { Screen } from "../Screen";
import { View } from "react-native";
import { AppText } from "@src/components/shared";
import { RootStackScreenProps } from "@src/router/Types";

export const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  return (
    <Screen>
      <View>
        <AppText fontBold sizeLarge>
          Home Screen
        </AppText>
      </View>
    </Screen>
  );
};
