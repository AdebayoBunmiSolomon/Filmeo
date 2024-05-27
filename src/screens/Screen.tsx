import { layout } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

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
    width: "92%",
    height: "100%",
    alignSelf: "center",
    paddingTop: layout.size50,
  },
});
