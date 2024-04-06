import React, { useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import { AppText, AppButton } from "../shared";
import { DVH, DVW, layout, screenHeight, screenWidth } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

type modalMessageProps = {
  visible: boolean;
  setVisible: () => void;
  title?: string;
  btnTitle?: string;
  onPress: () => void;
  type?: "success" | "danger" | "warning" | "info";
};

export const ModalMessage: React.FC<modalMessageProps> = ({
  visible,
  setVisible,
  title,
  btnTitle,
  onPress,
  type,
}) => {
  const { theme } = useContext(ThemeContext);

  const msgIconType = () => {
    if (type === "success") {
      return (
        <Image
          source={require("@src/assets/icons/success.png")}
          resizeMode='center'
          style={styles.msgIcon}
        />
      );
    } else if (type === "warning") {
      return (
        <Image
          source={require("@src/assets/icons/warning.png")}
          resizeMode='center'
          style={styles.msgIcon}
        />
      );
    } else if (type === "danger") {
      return (
        <Image
          source={require("@src/assets/icons/danger.png")}
          resizeMode='center'
          style={styles.msgIcon}
        />
      );
    } else if (type === "info") {
      return (
        <Image
          source={require("@src/assets/icons/information.png")}
          resizeMode='center'
          style={styles.msgIcon}
        />
      );
    } else {
      return (
        <AppText fontLight sizeBody style={styles.msgText}>
          Specify type
        </AppText>
      );
    }
  };

  return (
    <>
      {visible ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[
            styles.container,
            {
              backgroundColor:
                theme === "dark" ? colors.modalBg : colors.modalBg,
            },
          ]}>
          <Animated.View
            entering={ZoomIn}
            exiting={ZoomOut}
            style={[
              styles.messageContainer,
              {
                backgroundColor: theme === "dark" ? colors.black : colors.white,
              },
            ]}>
            <View>
              <View>{msgIconType()}</View>
              <AppText fontRegular sizeBody black style={styles.msgText}>
                {title ? title : "Please provide a message text"}
              </AppText>
            </View>
            <AppButton
              title={btnTitle ? btnTitle : "Title not specified"}
              onPress={() => {
                setVisible();
                onPress();
              }}
              style={{
                width: "85%",
              }}
            />
          </Animated.View>
        </Animated.View>
      ) : undefined}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    width: screenWidth,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    width: "90%",
    paddingVertical: screenHeight / 22,
    gap: layout.size18,
    borderRadius: layout.size10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  msgIcon: {
    width: DVW(15),
    height: DVH(10),
    alignSelf: "center",
  },
  msgText: {
    maxWidth: "80%",
    textAlign: "center",
  },
});
