import React, { useContext, useEffect, useState } from "react";
import { Screen } from "../../Screen";
import {
  AppButton,
  AppText,
  Header,
  ToggleSwitch,
} from "@src/components/shared";
import { BottomTabBarScreenProps } from "@src/router/Types";
import { settingsType } from "@src/types/types";
import { AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { DVH, DVW, moderateScale, verticalScale } from "@src/resources";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useToggleSwitch } from "@src/components/core/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
import { useAuthentication } from "@src/functions/hooks/services";
import {
  useDeleteUser,
  useNotificationSubscription,
} from "@src/functions/firebase/services";
import { Loader, ModalMessage } from "@src/components/core";
import { useSeenOnboarding } from "@src/hooks/state";
import { usePushTokenStore } from "@src/functions/firebase/store";
import { useModalMessage, useUserDataStore } from "@src/hooks/store";

export const Settings = ({}: BottomTabBarScreenProps<"Settings">) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { switchToggle, switchOn } = useToggleSwitch();
  const { pushToggleOn, togglePushNotification, subscribeLoading } =
    useNotificationSubscription();
  const [cachedToken, setCachedToken] = useState<string>("");
  const { logOut } = useAuthentication();
  const { unRegisterOnboarding } = useSeenOnboarding();
  const { deleteUser, deleteLoading } = useDeleteUser();
  const { modalMessage, setModalMessage } = useModalMessage();
  const { userData } = useUserDataStore();

  const settings: settingsType = [
    {
      title: "Edit Details",
      icon: AntDesign,
      function: () => {
        console.log("Edit Details");
      },
    },
    {
      title: "Preferred Theme",
      icon: MaterialCommunityIcons,
      function: () => {},
    },
    {
      title: "Subscribe to Push Notification",
      icon: AntDesign,
      function: () => {},
    },
    {
      title: "Log-Out",
      icon: Entypo,
      function: () => {
        logOut();
      },
    },
  ];

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem(storageKey.PUSH_TOKEN);
      const parsedToken = JSON.parse(token!);
      if (parsedToken !== null) {
        setCachedToken(parsedToken);
      } else {
        setCachedToken("No token found on device");
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    toggleTheme(switchOn);
  }, [switchOn]);
  return (
    <>
      <Screen>
        <Header backHeader={true} title='Settings' />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            source={{ uri: String(userData.picture) }}
            resizeMode='contain'
            style={[
              styles.image,
              {
                borderColor:
                  theme === "dark" ? colors.primaryColor2 : colors.primaryColor,
              },
            ]}
          />
          <View
            style={[
              styles.settingsContainer,
              {
                backgroundColor: colors.lightGray,
                marginBottom: verticalScale(20),
              },
            ]}>
            {settings &&
              settings.map((items, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.settingsBtn}
                    onPress={() => items.function()}>
                    <View style={styles.titleContainer}>
                      <>
                        {items.title === settings[2].title &&
                        subscribeLoading === true ? (
                          <Loader
                            sizes='small'
                            color={
                              theme === "dark"
                                ? colors.primaryColor2
                                : colors.primaryColor
                            }
                          />
                        ) : undefined}
                        <items.icon
                          name={
                            items.title === settings[0].title
                              ? "edit"
                              : items.title === settings[1].title
                              ? "theme-light-dark"
                              : items.title === settings[2].title
                              ? "notification"
                              : items.title === settings[3].title
                              ? "log-out"
                              : undefined
                          }
                          color={theme === "dark" ? colors.white : colors.black}
                          size={moderateScale(25)}
                        />
                      </>
                      <AppText fontRegular sizeSmall black>
                        {items.title}
                      </AppText>
                    </View>
                    <View>
                      {items.title === settings[1].title && (
                        <ToggleSwitch
                          switchOn={switchOn}
                          toggleSwitch={switchToggle}
                        />
                      )}
                      {items.title === settings[2].title && (
                        <ToggleSwitch
                          switchOn={pushToggleOn}
                          toggleSwitch={() => {
                            togglePushNotification();
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
          <AppText fontRegular sizeBody black>
            Filmeo push token:
          </AppText>
          <AppText fontExtraLight sizeBody gray>
            {cachedToken}
          </AppText>
          <AppButton
            title='Delete Account'
            style={styles.deleteAcctButton}
            onPress={async () => {
              await deleteUser();
            }}
            danger
            rightIcon={
              <AntDesign
                name='delete'
                color={colors.white}
                size={moderateScale(20)}
              />
            }
            isLoading={deleteLoading}
          />
        </ScrollView>
      </Screen>
      <ModalMessage
        visible={modalMessage.visible}
        setVisible={() =>
          setModalMessage({ ...modalMessage, visible: !modalMessage.visible })
        }
        title={modalMessage.title}
        btnTitle={modalMessage.btnTitle}
        onPress={async () => {
          await logOut();
          await unRegisterOnboarding();
        }}
        type={modalMessage.type}
        enteringAnimation='BounceInUp'
        exitingAnimation='BounceOutDown'
      />
    </>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    paddingBottom: verticalScale(10),
    paddingHorizontal: DVW(5),
    borderRadius: moderateScale(10),
  },
  settingsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(10),
    borderBottomWidth: DVW(0.2),
  },
  image: {
    width: DVW(30),
    height: DVH(15),
    borderRadius: moderateScale(100),
    borderWidth: DVW(0.5),
    alignSelf: "center",
    marginBottom: verticalScale(20),
  },
  deleteAcctButton: {
    marginTop: verticalScale(30),
  },
  scrollContainer: {
    flexGrow: 0.4,
    marginTop: verticalScale(10),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
});
