import { DrawerContentScrollView } from "@react-navigation/drawer";
import { AppButton, AppText } from "@src/components/shared";
import { useAuthentication } from "@src/functions/hooks/services";
import {
  DVH,
  DVW,
  font,
  layout,
  moderateScale,
  verticalScale,
} from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useState } from "react";
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { drawerScreens } from "./screen-routes/ScreenRoutes";
import {
  AntDesign,
  FontAwesome,
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type drawerProps = {
  props: any;
};

export const CustomDrawer: React.FC<drawerProps> = ({ props }) => {
  const { theme } = useContext(ThemeContext);
  const { logOut, loading } = useAuthentication();
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? colors.black : colors.white,
        },
      ]}>
      <View
        style={[
          styles.container2,
          {
            backgroundColor:
              theme === "dark" ? colors.primaryColor : colors.primaryColor2,
          },
        ]}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Image
            resizeMode='contain'
            source={require("@src/assets/images/experience.png")}
            style={{
              width: DVW(25),
              height: DVH(25),
              borderRadius: 50,
              borderColor: "white",
            }}
          />
          <AppText
            fontRegular
            sizeSmall
            style={{
              marginTop: verticalScale(-30),
              color: colors.white,
            }}>
            adebayobunmisolomon@gamil.com
          </AppText>
        </View>
      </View>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <>
          <View style={styles.list}>
            {drawerScreens.map((screen, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    if (screen.nestedNavigation !== null) {
                      setExpanded(!expanded);
                    } else {
                      setExpanded(!expanded);
                      props.navigation.navigate(screen.name);
                    }
                  }}>
                  <View style={styles.drawerItem}>
                    {screen.iconName === "music" ? (
                      <Entypo
                        name={screen.iconName}
                        size={font.size20}
                        color={theme === "dark" ? colors.gray : colors.black}
                      />
                    ) : screen.iconName === "local-movies" ? (
                      <MaterialIcons
                        name={screen.iconName}
                        size={font.size20}
                        color={theme === "dark" ? colors.gray : colors.black}
                      />
                    ) : screen.iconName === "search" ? (
                      <FontAwesome
                        name={screen.iconName}
                        size={font.size20}
                        color={theme === "dark" ? colors.gray : colors.black}
                      />
                    ) : (
                      <AntDesign
                        name={screen.iconName}
                        size={font.size20}
                        color={theme === "dark" ? colors.gray : colors.black}
                      />
                    )}
                    <AppText
                      sizeMedium
                      fontRegular
                      style={[
                        styles.dropDownText,
                        {
                          color: theme === "dark" ? colors.gray : colors.black,
                        },
                      ]}>
                      {screen.label}
                    </AppText>
                    {screen.nestedNavigation &&
                      (expanded === true ? (
                        <MaterialIcons
                          name={"keyboard-arrow-up"}
                          size={moderateScale(30)}
                          color={theme === "dark" ? colors.gray : colors.black}
                        />
                      ) : (
                        <MaterialIcons
                          name={"keyboard-arrow-down"}
                          size={moderateScale(30)}
                          color={theme === "dark" ? colors.gray : colors.black}
                        />
                      ))}
                  </View>
                </TouchableOpacity>
                {expanded === true && screen.nestedNavigation && (
                  <Animated.View
                    style={styles.subMenu}
                    entering={FadeIn}
                    exiting={FadeOut}>
                    {screen.nestedNavigation.map((item, subIndex) => (
                      <TouchableOpacity
                        key={subIndex}
                        onPress={() => {
                          props.navigation.navigate(item.name);
                        }}>
                        <View style={styles.subMenuItem}>
                          {item.name === "SearchMovies" ? (
                            <MaterialIcons
                              name={"local-movies"}
                              size={font.size20}
                              color={
                                theme === "dark" ? colors.gray : colors.black
                              }
                            />
                          ) : item.name === "SearchPeople" ? (
                            <Ionicons
                              name={"people"}
                              size={font.size20}
                              color={
                                theme === "dark" ? colors.gray : colors.black
                              }
                            />
                          ) : (
                            <MaterialCommunityIcons
                              name='google-circles-extended'
                              size={font.size20}
                              color={
                                theme === "dark" ? colors.gray : colors.black
                              }
                            />
                          )}
                          <AppText
                            sizeMedium
                            fontRegular
                            style={{
                              color:
                                theme === "dark" ? colors.gray : colors.black,
                            }}>
                            {item.label}
                          </AppText>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </Animated.View>
                )}
              </View>
            ))}
          </View>
        </>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.createContainer}>
          <AppButton
            title='Log out'
            onPress={() => {
              logOut();
            }}
            isLoading={loading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    flexDirection: "column",
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight : layout.size10,
    height: DVH(30),
    paddingHorizontal: font.size10,
    overflow: "hidden",
  },
  list: {
    marginTop: DVH(2),
    paddingBottom: DVH(10),
  },
  bottomContainer: {
    alignSelf: "center",
    width: "80%",
    bottom: Platform.OS === "ios" ? moderateScale(10) : undefined,
  },
  bottomDescr: {
    width: "80%",
    marginBottom: font.size20,
  },
  createContainer: {
    marginTop: DVH(-7),
    flexDirection: "row",
    alignItems: "center",
  },
  drawerItem: {
    padding: moderateScale(16),
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(25),
  },
  subMenu: {
    backgroundColor: "transparent",
  },
  subMenuItem: {
    padding: moderateScale(15),
    backgroundColor: colors.lightGray,
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(25),
  },
  dropDownText: {
    width: DVW(45),
  },
});
