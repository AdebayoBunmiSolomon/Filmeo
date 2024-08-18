import { Loader, SheetModal } from "@src/components/core";
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

type mediaOptionsModalTypes = {
  visible: boolean;
  setVisible: (value: React.SetStateAction<boolean>) => void;
  snapHeight?: `${number}%`;
};

export const MediaOptions: React.FC<mediaOptionsModalTypes> = ({
  visible,
  setVisible,
  snapHeight,
}) => {
  const { theme } = useContext(ThemeContext);
  const { openCamera, cameraLoading } = useCameraServices();
  const { pickImageFromGallery, galleryLoading } = useGalleryService();
  return (
    <>
      <SheetModal
        visible={visible}
        setVisible={setVisible}
        snapHeight={snapHeight}>
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
              {galleryLoading ? (
                <Loader
                  sizes='small'
                  color={
                    theme === "dark"
                      ? colors.primaryColor2
                      : colors.primaryColor
                  }
                />
              ) : (
                <FontAwesome5
                  name='images'
                  size={layout.size22}
                  color={
                    theme === "dark"
                      ? colors.primaryColor
                      : colors.primaryColor2
                  }
                />
              )}
            </TouchableOpacity>
            <AppText fontRegular sizeBody black style={styles.appText}>
              Gallery
            </AppText>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                openCamera();
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
              {cameraLoading ? (
                <Loader
                  sizes='small'
                  color={
                    theme === "dark"
                      ? colors.primaryColor2
                      : colors.primaryColor
                  }
                />
              ) : (
                <Ionicons
                  name='camera'
                  size={layout.size22}
                  color={
                    theme === "dark"
                      ? colors.primaryColor
                      : colors.primaryColor2
                  }
                />
              )}
            </TouchableOpacity>
            <AppText fontRegular sizeBody black style={styles.appText}>
              Camera
            </AppText>
          </View>
        </View>
      </SheetModal>
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
