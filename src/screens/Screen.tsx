import { layout } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

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
          backgroundColor: theme === "dark" ? "black" : "white",
        },
      ]}>
      {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
      <View style={styles.container}>{children}</View>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    width: "95%",
    height: "100%",
    alignSelf: "center",
    paddingTop: layout.size50,
  },
});
