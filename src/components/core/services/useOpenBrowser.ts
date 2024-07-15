import * as WebBrowser from "expo-web-browser";

export const useOpenBrowser = () => {
  const openInAppWebBrowser = async (resourceUrlOrUriToOpen: string) => {
    await WebBrowser.openBrowserAsync(resourceUrlOrUriToOpen);
  };

  return {
    openInAppWebBrowser,
  };
};
