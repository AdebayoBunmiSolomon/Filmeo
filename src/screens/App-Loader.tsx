import React, { useContext } from "react";
import { Screen } from "./Screen";
import { ActivityIndicator, StyleSheet, View, Image } from "react-native";
import { AppText } from "@src/components/shared";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { DVH, DVW, layout } from "@src/resources";

export const AppLoader: React.FC<{}> = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Screen>
      <View style={styles.container}>
        <Image
          source={require("@src/assets/icons/cinema.png")}
          resizeMode='contain'
          style={styles.image}
        />
        <AppText sizeXtraLarge>Filmeo</AppText>
      </View>
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size={"large"}
          color={theme === "dark" ? colors.white : colors.white}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    gap: layout.size18,
  },
  loaderContainer: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: DVW(20),
    height: DVH(10),
  },
});
