import React, { useContext, useEffect } from "react";
import { AppButton } from "../shared";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import { useCameraServices } from "./services";
import {
  layout,
  moderateScale,
  screenWidth,
  verticalScale,
} from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, Camera, FlashMode } from "expo-camera";
import { useImageStore } from "./store";

type cameraProps = {
  visible: boolean;
  onRequestCloseModal: (value: React.SetStateAction<boolean>) => void;
};

export const CameraModal: React.FC<cameraProps> = ({
  visible,
  onRequestCloseModal,
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
  const { theme } = useContext(ThemeContext);
  const { setCapturedImage } = useImageStore();

  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <>
      <Modal
        animationType='slide'
        transparent={false}
        visible={visible}
        onRequestClose={() => {
          onRequestCloseModal(!visible);
        }}>
        <View style={styles.cameraContainer}>
          {!image ? (
            <Camera
              style={styles.camera}
              flashMode={flash}
              type={type}
              ref={cameraRef}>
              <View style={styles.actionBtn}>
                <TouchableOpacity
                  onPress={() => {
                    setFlash(
                      flash === FlashMode.off ? FlashMode.on : FlashMode.off
                    );
                  }}>
                  <Ionicons
                    name={`${flash === FlashMode.on ? "flash" : "flash-off"}`}
                    color={theme === "dark" ? colors.white : colors.white}
                    size={moderateScale(25)}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRequestCloseModal(!visible)}>
                  <Ionicons
                    name='close-circle-outline'
                    color={theme === "dark" ? colors.white : colors.white}
                    size={moderateScale(25)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.takeAPicBtn}>
                {!image && (
                  <>
                    <View style={styles.cameraReverse}>
                      <TouchableOpacity
                        onPress={() =>
                          setType(
                            type === CameraType.back
                              ? CameraType.front
                              : CameraType.back
                          )
                        }>
                        <Ionicons
                          name='camera-reverse'
                          color={theme === "dark" ? colors.white : colors.white}
                          size={moderateScale(40)}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <AppButton
                        title='Take a picture'
                        onPress={() => takeAPicture()}
                      />
                    </View>
                  </>
                )}
              </View>
            </Camera>
          ) : (
            <>
              <Image source={{ uri: image }} style={styles.camera} />
              {image && (
                <View style={styles.imgActionBtn}>
                  <AppButton
                    title='Re-take'
                    onPress={() => setImage(null)}
                    style={{
                      width: "45%",
                    }}
                  />
                  <AppButton
                    title='Continue'
                    onPress={() => {
                      onRequestCloseModal(!visible);
                      setCapturedImage(image);
                    }}
                    style={{
                      width: "45%",
                    }}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: layout.size6,
    height: "100%",
    width: screenWidth,
  },
  imgActionBtn: {
    flexDirection: "row",
    flex: 1,
    position: "absolute",
    width: screenWidth,
    bottom: verticalScale(60),
    justifyContent: "space-between",
    paddingHorizontal: layout.size10,
  },
  takeAPicBtn: {
    flex: 1,
    position: "absolute",
    width: screenWidth,
    bottom: verticalScale(60),
    justifyContent: "space-between",
    paddingHorizontal: layout.size10,
    gap: layout.size26,
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    height: "105%",
    position: "absolute",
    width: screenWidth,
  },
  actionBtn: {
    paddingTop: Platform.OS === "ios" ? layout.size50 : layout.size6,
    position: "absolute",
    width: screenWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: layout.size10,
  },
  cameraReverse: {
    alignSelf: "flex-end",
  },
});
