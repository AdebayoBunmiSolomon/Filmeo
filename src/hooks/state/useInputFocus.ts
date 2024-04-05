import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { useContext, useState } from "react";

export const useInputFocus = () => {
  const { theme } = useContext(ThemeContext);
  const [textInputFocus, setTextInputFocus] = useState<boolean>(false);

  const borderColor = () => {
    if (textInputFocus && theme === "dark") {
      return colors.primaryColor;
    } else if (textInputFocus && theme === "light") {
      return colors.primaryColor2;
    } else if (!textInputFocus && theme === "dark") {
      return colors.gray;
    } else if (!textInputFocus && theme === "light") {
      return colors.gray;
    } else {
      return undefined;
    }
  };

  const inputIconColor = () => {
    if (textInputFocus && theme === "dark") {
      return colors.primaryColor;
    } else if (textInputFocus && theme === "light") {
      return colors.primaryColor2;
    } else if (!textInputFocus && theme === "dark") {
      return colors.gray;
    } else if (!textInputFocus && theme === "light") {
      return colors.gray;
    } else {
      return undefined;
    }
  };

  //fires when the text-input is focused
  const onTextInputFocus = () => {
    setTextInputFocus(!textInputFocus);
    return textInputFocus;
  };

  //fires when the text-input is not focused
  const onBlurInputFocus = () => {
    setTextInputFocus(!textInputFocus);
    return textInputFocus;
  };

  return {
    onBlurInputFocus,
    onTextInputFocus,
    borderColor,
    inputIconColor,
  };
};
