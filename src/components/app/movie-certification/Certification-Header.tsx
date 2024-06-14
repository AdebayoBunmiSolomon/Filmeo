import { AppText } from "@src/components/shared";
import { DVH, moderateScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "@src/resources/Theme";

type certificationProps = {
  headerTitle: string;
  onClick: () => void;
  index: number;
  btnIndex: number;
};

export const CertificationHeader: React.FC<certificationProps> = ({
  headerTitle,
  onClick,
  index,
  btnIndex,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <TouchableOpacity
        style={[
          styles.btn,
          {
            backgroundColor: colors.lightGray,
          },
        ]}
        onPress={() => onClick()}>
        <AppText fontSemibold sizeBody black>
          {headerTitle}
        </AppText>
        <MaterialIcons
          name={
            btnIndex === index ? "keyboard-arrow-up" : "keyboard-arrow-down"
          }
          size={moderateScale(30)}
          color={theme === "dark" ? colors.white : colors.black}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: DVH(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(20),
  },
});
