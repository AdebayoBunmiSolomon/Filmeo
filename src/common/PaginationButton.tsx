import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { layout } from "@src/resources";

type paginationBtnProps = {
  prevFunc?: () => void;
  nextFunc?: () => void;
};

export const PrevButton: React.FC<paginationBtnProps> = ({ prevFunc }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <TouchableOpacity
        style={[
          styles.nextBtn,
          {
            backgroundColor: colors.lightGray,
          },
        ]}
        onPress={prevFunc}>
        <Feather
          name='chevron-left'
          color={theme === "dark" ? colors.white : colors.black}
          size={layout.size30}
        />
      </TouchableOpacity>
    </>
  );
};

export const NextButton: React.FC<paginationBtnProps> = ({ nextFunc }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <TouchableOpacity
        style={[
          styles.nextBtn,
          {
            backgroundColor: colors.lightGray,
          },
        ]}
        onPress={nextFunc}>
        <Feather
          name='chevron-right'
          color={theme === "dark" ? colors.white : colors.black}
          size={layout.size30}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  nextBtn: {
    paddingHorizontal: layout.size8,
    paddingVertical: layout.size8,
    borderRadius: 50,
  },
});
