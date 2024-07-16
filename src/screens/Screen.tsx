import { layout } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { View, StyleSheet, StatusBar, Platform } from "react-native";

type screenProps = {
  children: React.ReactNode;
};

export const Screen: React.FC<screenProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: theme === "dark" ? colors.black : colors.white,
        },
      ]}>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    width: Platform.OS === "ios" ? "95%" : "96%",
    height: "100%",
    alignSelf: "center",
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight : layout.size50,
  },
});
