import { firestoreDB } from "@src/api/configuration/firebase";
import { useImageStore } from "@src/components/core/store";
import { collections } from "@src/functions/firebase/collection";
import {
  useDeleteImage,
  useGetImageURL,
} from "@src/functions/firebase/services/image";
import { useNetworkConnected } from "@src/hooks/state";
import { useModalMessage, useUserDataStore } from "@src/hooks/store";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useSettings = () => {
  const [isOpenMediaOption, setIsMediaOpenOption] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { deleteImg } = useDeleteImage();
  const { getImgURL } = useGetImageURL();
  const { userData } = useUserDataStore();
  const { setModalMessage, modalMessage } = useModalMessage();
  const { networkState } = useNetworkConnected();
  const { capturedImage, setCapturedImage } = useImageStore();

  useEffect(() => {
    const changeImage = async (imageName: string) => {
      setIsUploading(true);
      try {
        console.log(imageName);
        setCapturedImage("");
      } catch (err) {
        console.log("Error", err);
      } finally {
        setIsUploading(false);
      }
    };

    const initiateChangeImg = async () => {
      if (capturedImage && isOpenMediaOption) {
        const imageName = "2"; // or however you want to derive imageName
        await changeImage(imageName);
      }
    };

    initiateChangeImg();
  }, [capturedImage, isOpenMediaOption]);

  return {
    isOpenMediaOption,
    setIsMediaOpenOption,
    isUploading,
    capturedImage,
  };
};
