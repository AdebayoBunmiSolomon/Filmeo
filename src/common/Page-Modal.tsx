import React, { useContext } from "react";
import { ThemeContext } from "@src/resources/Theme";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { DVH, DVW, moderateScale, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { AppText } from "@src/components/shared";

type pageModalProps = {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (value: React.SetStateAction<boolean>) => void;
};

export const PageModal: React.FC<pageModalProps> = ({
  children,
  visible,
  setVisible,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={visible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View
          style={[
            styles.innerModalContainer,
            {
              backgroundColor:
                theme === "dark" ? colors.modalBg : colors.modalBg,
            },
          ]}>
          <TouchableOpacity
            style={[
              styles.closeBtn,
              {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(56, 53, 53, 0.26)"
                    : "rgba(0, 0, 0, 0.162)",
              },
            ]}
            onPress={() => setVisible(!visible)}>
            <AppText
              fontSemibold
              sizeMedium
              style={{
                color: colors.white,
              }}>
              X
            </AppText>
          </TouchableOpacity>
          {children}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  innerModalContainer: {
    width: "100%",
    height: "100%",
    paddingTop: verticalScale(30),
    paddingHorizontal: moderateScale(10),
  },
  closeBtn: {
    width: DVW(10),
    height: DVH(5),
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
