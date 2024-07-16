import { font, fontFamily } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type appTextProps = {
  children: React.ReactNode;
  fontExtraLight?: boolean;
  fontLight?: boolean;
  fontRegular?: boolean;
  fontSemibold?: boolean;
  fontBold?: boolean;
  sizeSmall?: boolean;
  sizeBody?: boolean;
  sizeMedium?: boolean;
  sizeLarge?: boolean;
  sizeXtraLarge?: boolean;
  black?: boolean;
  white?: boolean;
  red?: boolean;
  gray?: boolean;
  lightGray?: boolean;
  mainColor?: boolean;
  style?: StyleProp<TextStyle> | any;
};

export const AppText: React.FC<appTextProps> = ({
  children,
  fontBold,
  fontExtraLight,
  fontLight,
  fontRegular,
  fontSemibold,
  sizeSmall,
  sizeBody,
  sizeMedium,
  sizeLarge,
  sizeXtraLarge,
  black,
  white,
  red,
  gray,
  lightGray,
  mainColor,
  style,
}) => {
  const { theme } = useContext(ThemeContext);

  const textColorScheme = () => {
    if (black) {
      if (black && theme === "dark") {
        return colors.white;
      } else {
        return "black";
      }
    } else if (white) {
      if (white && theme === "light") {
        return colors.black;
      } else {
        return colors.gray;
      }
    } else if (red) {
      if (red && theme === "dark") {
        return colors.danger;
      } else {
        return colors.danger;
      }
    } else if (mainColor) {
      if (mainColor && theme === "dark") {
        return colors.primaryColor;
      } else {
        return colors.primaryColor2;
      }
    } else if (gray) {
      if (gray && theme === "dark") {
        return colors.gray;
      } else {
        return colors.gray;
      }
    } else if (lightGray) {
      if (lightGray && theme === "dark") {
        return colors.lightGray;
      } else {
        return colors.lightGray;
      }
    } else if (!white || !black) {
      if (theme === "dark") {
        return colors.white;
      } else {
        return colors.black;
      }
    }
  };

  const textColor = textColorScheme();

  return (
    <>
      <Text
        style={[
          style && style,
          {
            fontFamily: fontBold
              ? fontFamily.source_sans_bold
              : fontExtraLight
              ? fontFamily.source_sans_extra_light
              : fontLight
              ? fontFamily.source_sans_light
              : fontSemibold
              ? fontFamily.source_sans_semibold
              : fontRegular
              ? fontFamily.source_sans_regular
              : undefined,
            fontSize: sizeSmall
              ? font.size14
              : sizeBody
              ? font.size16
              : sizeMedium
              ? font.size20
              : sizeLarge
              ? font.size22
              : sizeXtraLarge
              ? font.size26
              : undefined,
            color: style?.color || textColor,
            paddingHorizontal: style?.paddingHorizontal
              ? style?.paddingHorizontal
              : undefined,
            flexWrap: style?.flexWrap ? style?.flexWrap : undefined,
          },
        ]}>
        {children}
      </Text>
    </>
  );
};
