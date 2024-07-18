import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { useContext } from "react";

export const useAppButton = (outline?: boolean, danger?: boolean) => {
  const { theme } = useContext(ThemeContext);
  const getAppBtnBgColor = () => {
    if (outline) {
      return "transparent";
    } else {
      if (danger) {
        return colors.danger;
      } else {
        return theme === "dark" ? colors.primaryColor2 : colors.primaryColor;
      }
    }
  };
  return {
    getAppBtnBgColor,
  };
};
