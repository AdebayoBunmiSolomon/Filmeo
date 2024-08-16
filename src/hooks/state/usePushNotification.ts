import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
import { useSavePushToken } from "@src/functions/firebase/services";
import Constants from "expo-constants";
import { generateRandomId, getCurrentDate } from "@src/helper/helper";
import { useMovieCardClick } from "@src/components/core/services";
import { useExtensiveSearch } from "@src/functions/api/services/search";
import { useAuthStore } from "@src/functions/hooks/store";

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotification = (): PushNotificationState => {
  const { movieCardClick } = useMovieCardClick();
  const { isAuthenticated } = useAuthStore();
  const { getXtensiveSearchOfMovieFromNotification } = useExtensiveSearch();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const { savePushTokenToFirestore } = useSavePushToken();

  const saveExpoPushTokenToCacheAndFireStore = async (token: any) => {
    await AsyncStorage.setItem(
      storageKey.PUSH_TOKEN,
      JSON.stringify(token.data)
    );
    await savePushTokenToFirestore({
      id: generateRandomId(10),
      date_created: getCurrentDate(),
      device_name:
        Platform.OS === "android" ? Constants.deviceName : Device?.modelName,
      device_type: Platform.OS,
      token: token.data,
      subscribed: false,
    });
  };

  async function registerPushNotificationAsync() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        enableVibrate: true,
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: "0d22ae9e-0ea0-4bfd-be36-99fc0d8e4caa",
      });
    } else {
      console.log("Error: please use a physical device");
    }
    return token ? token : token;
  }

  useEffect(() => {
    registerPushNotificationAsync().then((token) => {
      setExpoPushToken(token);
      saveExpoPushTokenToCacheAndFireStore(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    //this is triggered to open the app once the notification is clicked from the
    //notification bar
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          const title = response.notification.request.content?.data?.title;
          const mediaType =
            response.notification.request.content?.data?.mediaType;
          //validate to check if user is logged in or not
          if (!isAuthenticated) {
            console.log("User is not authenticated");
            // Alert.alert("Error", "User is not authenticated", [
            //   {
            //     text: "Ok",
            //     onPress: () => {
            //       navigation.navigate("Login");
            //     },
            //   },
            // ]);
            return;
          }
          if (title) {
            console.log(mediaType);
            try {
              const { id, mediaTypeOfMovie } =
                await getXtensiveSearchOfMovieFromNotification(title, false, 1);
              if (id && mediaTypeOfMovie === "movie") {
                movieCardClick(id);
              } else {
                movieCardClick(id, mediaTypeOfMovie);
              }
            } catch (error) {
              console.error("Error handling notification:", error);
            }
          }
        }
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
