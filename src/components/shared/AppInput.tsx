import { DVW, font, fontFamily, layout } from "@src/resources";
import { colors } from "@src/resources/Colors";
import React, { useContext } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AppText } from "./AppText";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { ThemeContext } from "@src/resources/Theme";
import { useInputFocus, useVisibility } from "@src/hooks/state";

type appInputProps = {
  placeholder: string;
  label: string;
  searchInput?: boolean;
  dropDown?: boolean;
  onPressDropDown?: () => void;
  passwordInput?: boolean;
  phoneNumberInput?: boolean;
  numberInput?: boolean;
  inputStyle?: StyleProp<ViewStyle> | any;
  error?: string;
  onChangeText?: (value: string) => void;
  value?: string;
};

export const AppInput: React.FC<appInputProps> = ({
  placeholder,
  label,
  searchInput,
  dropDown,
  onPressDropDown,
  passwordInput,
  phoneNumberInput,
  numberInput,
  inputStyle,
  error,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const { borderColor, onBlurInputFocus, onTextInputFocus, inputIconColor } =
    useInputFocus();
  const { passWordVisible, onTogglePasswordVisible } = useVisibility();

  //get border color of input
  const getBorderColor = () => {
    if (error) {
      return colors.danger;
    } else {
      return borderColor();
    }
  };

  //get icon color of icon
  const getIconColor = () => {
    if (error) {
      return colors.danger;
    } else {
      return inputIconColor();
    }
  };

  return (
    <View style={styles.textMainContainer}>
      {label && (
        <AppText fontRegular sizeBody style={[styles.label]}>
          {label}
        </AppText>
      )}
      <View
        style={[
          styles.textContainer,
          {
            width: inputStyle ? inputStyle?.width : "100%",
            borderColor: getBorderColor(),
          },
        ]}>
        {searchInput && (
          <View>
            <Ionicons
              name='search'
              color={getIconColor()}
              size={layout.size18}
            />
          </View>
        )}
        {passwordInput ? (
          <>
            <TextInput
              placeholder={placeholder && placeholder}
              style={[
                styles.textInput,
                {
                  color: theme === "dark" ? colors.white : colors.black,
                  width: inputStyle?.width ? "75%" : "90%",
                },
              ]}
              placeholderTextColor={theme === "dark" ? "darkgray" : undefined}
              keyboardType={
                numberInput || phoneNumberInput ? "number-pad" : "default"
              }
              {...props}
              onFocus={() => onTextInputFocus()}
              onBlur={() => onBlurInputFocus()}
              secureTextEntry={passWordVisible}
            />
          </>
        ) : (
          <TextInput
            placeholder={placeholder && placeholder}
            style={[
              styles.textInput,
              {
                color: theme === "dark" ? colors.white : colors.black,
                width: inputStyle?.width ? "75%" : "90%",
              },
            ]}
            placeholderTextColor={theme === "dark" ? "darkgray" : undefined}
            keyboardType={
              numberInput || phoneNumberInput ? "number-pad" : "default"
            }
            {...props}
            onFocus={() => onTextInputFocus()}
            onBlur={() => onBlurInputFocus()}
          />
        )}
        {dropDown ? (
          <TouchableOpacity onPress={onPressDropDown}>
            <MaterialIcons
              name='keyboard-arrow-down'
              color={getIconColor()}
              size={layout.size20}
            />
          </TouchableOpacity>
        ) : passwordInput ? (
          <TouchableOpacity onPress={onTogglePasswordVisible}>
            <Feather
              name={`${passWordVisible ? "eye-off" : "eye"}`}
              color={getIconColor()}
              size={layout.size20}
            />
          </TouchableOpacity>
        ) : undefined}
      </View>
      {error && (
        <AppText fontRegular sizeSmall red>
          {error}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textMainContainer: {
    marginBottom: layout.size18,
    gap: layout.size4,
  },
  textContainer: {
    // width: DVW(92),
    paddingVertical: Platform.OS === "android" ? layout.size6 : layout.size14,
    paddingHorizontal: layout.size10,
    borderWidth: DVW(0.3),
    borderRadius: layout.size10,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    gap: layout.size10,
  },
  textInput: {
    fontFamily: fontFamily.source_sans_regular,
    fontSize: font.size16,
    // borderWidth: DVW(0.4),
    // width: "92%",
    paddingVertical: layout.size2,
  },
  label: {
    marginBottom: layout.size6,
  },
  dropDownBtn: {
    padding: layout.size20,
  },
});
