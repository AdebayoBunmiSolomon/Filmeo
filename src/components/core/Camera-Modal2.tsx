import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { AppText } from "../shared";
import { screenWidth } from "@src/resources";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { CameraType } from "expo-camera";

type camera2Props = {
  visible: boolean;
  onRequestCloseModal: (value: React.SetStateAction<boolean>) => void;
};

export const CameraModal2: React.FC<camera2Props> = ({
  visible,
  onRequestCloseModal,
}) => {
  const { theme } = useContext(ThemeContext);
  const [facing, setFacing] = useState<any>(CameraType.back);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current: any) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <>
      <Modal
        animationType='slide'
        transparent={false}
        visible={visible}
        onRequestClose={() => onRequestCloseModal(!visible)}>
        <View style={styles.cameraContainer}>
          <AppText fontRegular sizeXtraLarge mainColor>
            Hello from camera 2
          </AppText>
          <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleCameraFacing}>
                  <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    height: "105%",
    position: "absolute",
    width: screenWidth,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
