import { useRef, useState } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export const useCameraServices = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [type, setType] = useState<any>(CameraType.back);
  const [flash, setFlash] = useState<any>(FlashMode.off);
  const cameraRef = useRef<any>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const requestPermission = async () => {
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === "granted");
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  const takeAPicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  return {
    requestPermission,
    type,
    flash,
    cameraRef,
    image,
    takeAPicture,
    setImage,
    setType,
    setFlash,
    hasCameraPermission,
    isModalVisible,
    toggleModalVisibility,
  };
};
