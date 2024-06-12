import { AppText } from "@src/components/shared";
import { RootStackScreenProps } from "@src/router/Types";
import { Screen } from "@src/screens/Screen";
import React from "react";
import { View } from "react-native";

export const Test = ({}: RootStackScreenProps<"Test">) => {
  return (
    <Screen>
      <View>
        <AppText>Hello</AppText>
      </View>
    </Screen>
  );
};
