import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { layout } from "@src/resources";
import { AppText } from "@src/components/shared";

type headerProps = {
  onPress?: () => void;
  title?: string;
  rightIcon?: React.ReactNode;
  onPressRightIcon?: () => void;
};

export const Header: React.FC<headerProps> = ({
  onPress,
  title,
  rightIcon,
  onPressRightIcon,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <AntDesign
            name='arrowleft'
            color={
              theme === "dark" ? colors.primaryColor : colors.primaryColor2
            }
            size={layout.size26}
          />
        </TouchableOpacity>
        {rightIcon && (
          <TouchableOpacity onPress={onPressRightIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      <View>
        {title && (
          <AppText sizeMedium fontSemibold>
            {title}
          </AppText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    gap: layout.size10,
    marginBottom: layout.size12,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
