import React, { useContext } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { AppText } from "./AppText";
import { DVW, layout } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";

type appButtonProps = {
  title: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle> | any;
  outline?: boolean;
  onPress: () => void;
};

export const AppButton: React.FC<appButtonProps> = ({
  title,
  rightIcon,
  leftIcon,
  style,
  outline,
  onPress,
}) => {
  const { theme } = useContext(ThemeContext);
  const borderColor =
    theme === "dark" ? colors.primaryColor : colors.primaryColor;

  return (
    <>
      {outline ? (
        <TouchableOpacity
          onPress={onPress}
          style={[
            style,
            styles.buttonContainer,
            {
              backgroundColor: "transparent",
              width: style?.width || "100%",
              borderWidth: layout.size2,
              borderColor: style?.borderColor || borderColor,
            },
          ]}>
          {leftIcon && <>{leftIcon}</>}
          <AppText
            fontRegular
            sizeBody
            style={{
              color:
                theme === "dark" ? colors.primaryColor : colors.primaryColor2,
            }}>
            {title && title}
          </AppText>
          {rightIcon && <>{rightIcon}</>}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={[
            style,
            styles.buttonContainer,
            {
              backgroundColor:
                theme === "dark" ? colors.primaryColor : colors.primaryColor2,
              width: style?.width || "100%",
            },
          ]}>
          {leftIcon && <>{leftIcon}</>}
          <AppText
            fontRegular
            sizeBody
            style={{
              color: theme === "dark" ? colors.white : colors.white,
            }}>
            {title && title}
          </AppText>
          {rightIcon && <>{rightIcon}</>}
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: layout.size14,
    borderRadius: layout.size10,
    gap: layout.size6,
    bottom: layout.size10,
  },
});
