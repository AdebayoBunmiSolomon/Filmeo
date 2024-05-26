import React from "react";
import { Screen } from "../../Screen";
import { View } from "react-native";
import { AppText } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";

export const Music = ({ navigation }: DrawerStackScreenProps<"Music">) => {
  return (
    <Screen>
      <View>
        <AppText fontBold sizeLarge>
          Music Screen
        </AppText>
      </View>
    </Screen>
  );
};
