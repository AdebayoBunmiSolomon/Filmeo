import React from "react";
import { Screen } from "../Screen";
import { View } from "react-native";
import { AppText } from "@src/components/shared";
import { RootStackScreenProps } from "@src/router/Types";

export const About = ({ navigation }: RootStackScreenProps<"About">) => {
  return (
    <Screen>
      <View>
        <AppText fontBold sizeLarge>
          About Screen
        </AppText>
      </View>
    </Screen>
  );
};
