import * as Sharing from "expo-sharing";
import { Share } from "react-native";

export const useSharing = () => {
  const shareFileUrl = async (fileUrl: string) => {
    const isSharingAvailable = await Sharing.isAvailableAsync();
    if (isSharingAvailable) {
      await Sharing.shareAsync(fileUrl, {
        dialogTitle: "Share movie detail",
      });
    } else {
      console.log("No sharing available on this device");
    }
  };

  const shareHttpUrl = async (httpUrl: string) => {
    try {
      const result = await Share.share({
        message: `Check out this movie: ${httpUrl}`,
        url: httpUrl,
        title: "Share movie details",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing resource:", error);
    }
  };

  return {
    shareFileUrl,
    shareHttpUrl,
  };
};
