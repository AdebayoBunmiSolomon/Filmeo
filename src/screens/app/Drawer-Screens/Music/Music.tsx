import React from "react";
import { Screen } from "../../../Screen";
import { DrawerStackScreenProps } from "@src/router/Types";
import { AppButton, AppText, Header } from "@src/components/shared";
import { Image, StyleSheet, View } from "react-native";
import { DVH, DVW, verticalScale } from "@src/resources";

// async function sendPushNotification(expoPushToken: string) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title",
//     body: "And here is the body!",
//     data: { someData: "goes here" },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// }

// function handleRegistrationError(errorMessage: string) {
//   alert(errorMessage);
//   throw new Error(errorMessage);
// }

// async function registerForPushNotificationsAsync() {
//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       handleRegistrationError(
//         "Permission not granted to get push token for push notification!"
//       );
//       return;
//     }
//     const projectId =
//       Constants?.expoConfig?.extra?.eas?.projectId ??
//       Constants?.easConfig?.projectId;
//     if (!projectId) {
//       handleRegistrationError("Project ID not found");
//     }
//     try {
//       const pushTokenString = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       console.log(pushTokenString);
//       return pushTokenString;
//     } catch (e: unknown) {
//       handleRegistrationError(`${e}`);
//     }
//   } else {
//     handleRegistrationError("Must use physical device for push notifications");
//   }
// }

export const Music = ({ navigation }: DrawerStackScreenProps<"Music">) => {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState<
  //   Notifications.Notification | undefined
  // >(undefined);
  // const notificationListener = useRef<Notifications.Subscription>();
  // const responseListener = useRef<Notifications.Subscription>();

  // useEffect(() => {
  //   registerForPushNotificationsAsync()
  //     .then((token) => {
  //       setExpoPushToken(token ?? "");
  //       console.log("Token", token);
  //     })
  //     .catch((error: any) => setExpoPushToken(`${error}`));

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <Screen>
      <Header title='Music' backHeader />
      <View style={styles.textContainer}>
        <Image
          source={require("@src/assets/icons/rocket.png")}
          style={{
            height: DVH(30),
            width: DVW(30),
          }}
          resizeMode='contain'
        />
        <AppText
          fontRegular
          sizeMedium
          gray
          style={{
            maxWidth: DVW(80),
            textAlign: "center",
          }}>
          This feature is currently under development. Stay tuned for updates!
        </AppText>
        <AppButton title='Ok' onPress={() => navigation.goBack()} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(20),
  },
});
