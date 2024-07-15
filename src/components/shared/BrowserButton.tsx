import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { DVW, moderateScale, verticalScale } from "@src/resources";
import { useOpenBrowser } from "../core/services";

type browserButton = {
  url: string;
};

export const BrowserButton: React.FC<browserButton> = ({ url }) => {
  const { theme } = useContext(ThemeContext);
  const { openInAppWebBrowser } = useOpenBrowser();
  return (
    <>
      <TouchableOpacity
        style={{
          paddingVertical: verticalScale(10),
        }}
        onPress={() => openInAppWebBrowser(url)}>
        <Fontisto
          name='earth'
          color={theme === "dark" ? colors.white : colors.black}
          size={moderateScale(25)}
        />
      </TouchableOpacity>
    </>
  );
};
