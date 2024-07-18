import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import SwitchToggle from "react-native-switch-toggle";
import { Switch } from "react-native";

type toggleSwitchProps = {
  switchOn: boolean;
  toggleSwitch: () => void;
};

export const ToggleSwitch: React.FC<toggleSwitchProps> = ({
  switchOn,
  toggleSwitch,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    // <SwitchToggle
    //   switchOn={switchOn}
    //   onPress={() => toggleSwitch()}
    //   circleColorOff={theme === "dark" ? colors.black : colors.black}
    //   circleColorOn={
    //     theme === "dark" ? colors.primaryColor2 : colors.primaryColor
    //   }
    //   backgroundColorOn={theme === "dark" ? colors.black : colors.lightGray}
    //   backgroundColorOff={colors.gray} "#f4f3f4"
    // />
    <Switch
      trackColor={{ false: "#767577", true: colors.black }}
      thumbColor={
        switchOn && theme === "dark"
          ? colors.primaryColor2
          : switchOn && theme === "light"
          ? colors.primaryColor
          : !switchOn && theme === "dark"
          ? colors.lightGray
          : !switchOn && theme === "light"
          ? colors.black
          : undefined
      }
      ios_backgroundColor={theme === "dark" ? colors.gray : colors.lightGray}
      onValueChange={toggleSwitch}
      value={switchOn}
    />
  );
};
