import React, { useContext } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { AppText } from "./AppText";
import { layout } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Loader } from "../core";
import { useAppButton } from "@src/hooks/state";

type appButtonProps = {
  title: string;
  isLoading?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle> | any;
  outline?: boolean;
  onPress: () => void;
  danger?: boolean;
};

export const AppButton: React.FC<appButtonProps> = ({
  title,
  isLoading,
  rightIcon,
  leftIcon,
  style,
  outline,
  onPress,
  danger,
}) => {
  const { theme } = useContext(ThemeContext);
  const { getAppBtnBgColor } = useAppButton(outline, danger);
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
              backgroundColor: getAppBtnBgColor(),
              width: style?.width || "100%",
              borderWidth: layout.size2,
              borderColor: style?.borderColor || borderColor,
            },
          ]}
          disabled={isLoading}>
          {isLoading ? (
            <Loader
              sizes='small'
              color={
                theme === "dark" ? colors.primaryColor : colors.primaryColor2
              }
            />
          ) : (
            <>
              {leftIcon && <>{leftIcon}</>}
              <AppText
                fontRegular
                sizeBody
                style={{
                  color:
                    theme === "dark"
                      ? colors.primaryColor
                      : colors.primaryColor2,
                }}>
                {title && title}
              </AppText>
              {rightIcon && <>{rightIcon}</>}
            </>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={[
            style,
            styles.buttonContainer,
            {
              backgroundColor: getAppBtnBgColor(),
              width: style?.width || "100%",
            },
          ]}
          disabled={isLoading}>
          {isLoading ? (
            <Loader
              sizes='small'
              color={theme === "dark" ? colors.gray : colors.white}
            />
          ) : (
            <>
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
            </>
          )}
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
