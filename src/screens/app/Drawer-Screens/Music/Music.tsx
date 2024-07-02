import React from "react";
import { Screen } from "../../../Screen";
import { DrawerStackScreenProps } from "@src/router/Types";
import { AppButton, AppText, Header } from "@src/components/shared";
import { Image, StyleSheet, View } from "react-native";
import { DVH, DVW, verticalScale } from "@src/resources";

export const Music = ({ navigation }: DrawerStackScreenProps<"Music">) => {
  return (
    <Screen>
      <Header title='Music' backHeader />
      <View style={styles.textContainer}>
        <Image
          source={require("@src/assets/icons/rocket.png")}
          style={{
            height: DVH(30),
            width: DVW(30),
          }}
          resizeMode='contain'
        />
        <AppText
          fontRegular
          sizeMedium
          gray
          style={{
            maxWidth: DVW(80),
            textAlign: "center",
          }}>
          This feature is currently under development. Stay tuned for updates!
        </AppText>
        <AppButton title='Ok' onPress={() => navigation.goBack()} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(20),
  },
});
