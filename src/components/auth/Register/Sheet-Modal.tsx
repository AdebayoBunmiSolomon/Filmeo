import { SheetModal } from "@src/components/core";
import React, { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DVW, layout, screenWidth } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { AppButton, AppText } from "@src/components/shared";
import { useCameraServices } from "@src/components/core/services";
import { Camera, CameraType, FlashMode } from "expo-camera";
import App from "App";

type registerSheetModalTypes = {
  visible: boolean;
  setVisible: (value: React.SetStateAction<boolean>) => void;
};

export const RegisterSheetModal: React.FC<registerSheetModalTypes> = ({
  visible,
  setVisible,
}) => {
  const {
    requestPermission,
    type,
    flash,
    cameraRef,
    takeAPicture,
    image,
    setImage,
    setType,
    setFlash,
  } = useCameraServices();

  useEffect(() => {
    requestPermission();
  }, []);

  const { theme } = useContext(ThemeContext);
  return (
    <>
      <SheetModal visible={visible} setVisible={setVisible} snapHeight='22%'>
        <View style={styles.container}>
          <View>
            <TouchableOpacity
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
      <View style={styles.cameraContainer}>
        {!image ? (
          <Camera
            style={styles.camera}
            flashMode={flash}
            type={type}
            ref={cameraRef}>
            <View
              style={{
                paddingTop: 70,
              }}>
              <AppButton
                title='Rotate'
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              />

              <AppButton
                title='Flash'
                onPress={() => {
                  setFlash(
                    flash === FlashMode.off ? FlashMode.on : FlashMode.off
                  );
                }}
              />
            </View>
          </Camera>
        ) : (
          <Image source={{ uri: image }} style={styles.camera} />
        )}

        <View>
          {image ? (
            <View>
              <AppButton title='Re-take' onPress={() => setImage(null)} />
              <AppButton title='Save' onPress={() => {}} />
            </View>
          ) : (
            <AppButton title='Take a picture' onPress={() => takeAPicture()} />
          )}
        </View>
      </View>
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
