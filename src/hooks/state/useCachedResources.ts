import { useState } from "react";
import * as Font from "expo-font";
import {
  SourceSansPro_300Light,
  SourceSansPro_200ExtraLight,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
} from "@expo-google-fonts/source-sans-pro";

export const useCachedResources = () => {
  const [isLoadingFontComplete, setIsLoadingFontComplete] = useState(true);

  const loadResourcesAndDataAsync = async () => {
    try {
      await Font.loadAsync({
        "source-sans-extra-light": SourceSansPro_200ExtraLight,
        "source-sans-light": SourceSansPro_300Light,
        "source-sans-regular": SourceSansPro_400Regular,
        "source-sans-semibold": SourceSansPro_600SemiBold,
        "source-sans-bold": SourceSansPro_700Bold,
      });
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoadingFontComplete(false);
    }
  };

  return {
    isLoadingFontComplete,
    loadResourcesAndDataAsync,
  };

  // useEffect(() => {
  //   async function loadResourcesAndDataAsync() {
  //     try {
  //       await Font.loadAsync({
  //         "source-sans-extra-light": SourceSansPro_200ExtraLight,
  //         "source-sans-light": SourceSansPro_300Light,
  //         "source-sans-regular": SourceSansPro_400Regular,
  //         "source-sans-semibold": SourceSansPro_600SemiBold,
  //         "source-sans-bold": SourceSansPro_700Bold,
  //       });
  //     } catch (error) {
  //       console.warn(error);
  //     } finally {
  //       setIsLoadingComplete(false);
  //     }
  //   }
  //   loadResourcesAndDataAsync();
  // }, []);
  // return isLoadingComplete;
};
