import { CameraModal, SheetModal } from "@src/components/core";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DVW, layout, screenWidth } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { AppText } from "@src/components/shared";
import {
  useCameraServices,
  useGalleryService,
} from "@src/components/core/services";

type registerSheetModalTypes = {
  visible: boolean;
  setVisible: (value: React.SetStateAction<boolean>) => void;
};

export const RegisterSheetModal: React.FC<registerSheetModalTypes> = ({
  visible,
  setVisible,
}) => {
  const { theme } = useContext(ThemeContext);
  const { isModalVisible, toggleModalVisibility } = useCameraServices();
  const { pickImageFromGallery } = useGalleryService();
  return (
    <>
      <SheetModal visible={visible} setVisible={setVisible} snapHeight='22%'>
        <View style={styles.container}>
          <View>
            <TouchableOpacity
              onPress={() => pickImageFromGallery()}
              style={[
                styles.imgBtn,
                {
                  borderColor:
                    theme === "dark"
                      ? colors.primaryColor
                      : colors.primaryColor2,
                },
              ]}>
              <FontAwesome5
                name='images'
                size={layout.size22}
                color={
                  theme === "dark" ? colors.primaryColor : colors.primaryColor2
                }
              />
            </TouchableOpacity>
            <AppText fontRegular sizeBody black style={styles.appText}>
              Gallery
            </AppText>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                toggleModalVisibility();
              }}
              style={[
                styles.imgBtn,
                {
                  borderColor:
                    theme === "dark"
                      ? colors.primaryColor
                      : colors.primaryColor2,
                },
              ]}>
              <Ionicons
                name='camera'
                size={layout.size22}
                color={
                  theme === "dark" ? colors.primaryColor : colors.primaryColor2
                }
              />
            </TouchableOpacity>
            <AppText fontRegular sizeBody black style={styles.appText}>
              Camera
            </AppText>
          </View>
        </View>
      </SheetModal>
      <CameraModal
        visible={isModalVisible}
        onRequestCloseModal={toggleModalVisibility}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: layout.size14,
  },
  imgBtn: {
    width: DVW(15),
    paddingVertical: layout.size14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: layout.size50,
    borderWidth: DVW(0.2),
  },
  appText: {
    alignSelf: "center",
    paddingVertical: layout.size6,
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    width: screenWidth,
    height: "100%",
    position: "absolute",
    zIndex: 10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
