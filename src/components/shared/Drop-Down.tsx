import React, { useContext, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { AppText } from "./AppText";
import { DVW, layout, screenHeight, screenWidth } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

type dropDownProps = {
  data: {
    title: string;
    onPress: () => void;
  }[];
  visible: boolean;
  onCloseDropDown: () => void;
};

export const DropDown: React.FC<dropDownProps> = ({
  visible,
  data,
  onCloseDropDown,
}) => {
  const { theme } = useContext(ThemeContext);

  return visible ? (
    <TouchableWithoutFeedback onPress={() => onCloseDropDown()}>
      <View style={[styles.container, {}]}>
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={[
            styles.dropDownContainer,
            {
              backgroundColor: theme === "dark" ? colors.black : colors.white,
            },
          ]}>
          {data &&
            data.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                style={styles.dropdownButton}>
                <AppText fontRegular sizeBody>
                  {item.title}
                </AppText>
              </TouchableOpacity>
            ))}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    paddingTop: layout.size80,
    alignItems: "flex-end",
  },
  dropDownContainer: {
    paddingVertical: layout.size14,
    paddingHorizontal: layout.size10,
    width: DVW(50),
    borderRadius: layout.size10,
    gap: layout.size10,
    marginRight: layout.size6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  dropdownButton: {
    padding: layout.size6,
  },
});
