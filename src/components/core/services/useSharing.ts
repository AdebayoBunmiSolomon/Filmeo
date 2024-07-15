import * as Sharing from "expo-sharing";

export const useSharing = () => {
  const shareFeature = async (resourceUrlOrUriToShare: string) => {
    const isSharingAvailable = await Sharing.isAvailableAsync();
    if (isSharingAvailable) {
      await Sharing.shareAsync(resourceUrlOrUriToShare, {
        dialogTitle: "Share movie details",
      });
    } else {
      console.log("No sharing available on this device");
    }
  };

  return {
    shareFeature,
  };
};
