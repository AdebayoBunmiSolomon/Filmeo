import { AppText } from "@src/components/shared";
import { DVH, DVW, moderateScale, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

type formProps = {
  children: React.ReactNode;
  title: string;
};

export const Form: React.FC<formProps> = ({ children, title }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? colors.black : colors.white,
        },
      ]}>
      {title && (
        <AppText
          fontSemibold
          sizeBody
          gray
          style={{
            alignSelf: "flex-start",
            paddingLeft: DVW(5),
            paddingVertical: verticalScale(5),
          }}>
          {title}
        </AppText>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    paddingVertical: DVH(1),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: moderateScale(10),
  },
});
