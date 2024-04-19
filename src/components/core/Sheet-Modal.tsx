import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "@src/resources/Theme";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@src/resources/Colors";
import { DVW, layout, screenHeight, screenWidth } from "@src/resources";
import Animated, {
  SlideInDown,
  SlideOutDown,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

type snap = `${number}%`;

type sheetModalProps = {
  visible: boolean;
  setVisible: (value: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
  /**
   * snapHeight must be in percentage e.g. 25% or any percentage of your choice
   * */
  snapHeight?: snap;
};

export const SheetModal: React.FC<sheetModalProps> = ({
  visible,
  setVisible,
  children,
  snapHeight,
}) => {
  const { theme } = useContext(ThemeContext);
  const numericPercentage = parseFloat(snapHeight ? snapHeight : "0%");
  const height = (numericPercentage / 100) * screenHeight;
  return (
    <>
      {visible && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[
            styles.container,
            {
              backgroundColor: colors.modalBg,
            },
          ]}>
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}
            style={[
              styles.modal,
              {
                backgroundColor: theme === "dark" ? colors.black : colors.white,
                height: height ? height : "26%",
              },
            ]}>
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={styles.backBtn}>
              <AntDesign
                name='arrowleft'
                size={layout.size22}
                color={theme === "dark" ? colors.white : colors.black}
              />
            </TouchableOpacity>
            <View>{children && children}</View>
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: screenWidth,
    position: "absolute",
    zIndex: 10,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
  },
  modal: {
    paddingVertical: layout.size26,
    paddingBottom: layout.size34,
    paddingHorizontal: layout.size10,
    borderTopLeftRadius: layout.size18,
    borderTopRightRadius: layout.size18,
  },
  backBtn: {
    width: DVW(10),
    marginBottom: layout.size18,
  },
});
