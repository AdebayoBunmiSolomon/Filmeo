import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AppButton, AppText } from "@src/components/shared";
import { DVH, DVW, font, moderateScale, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";

type drawerProps = {
  props: any;
};

export const CustomDrawer: React.FC<drawerProps> = ({ props }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? colors.black : colors.white,
        },
      ]}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <>
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
          <View style={styles.list}>
            <DrawerItemList {...props} />
          </View>
        </>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.createContainer}>
          <AppButton
            title='Log out'
            onPress={() => {
              console.log("bottom button");
            }}
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(-50),
    height: DVH(30),
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: font.size10,
    overflow: "hidden",
  },

  list: {
    marginTop: DVH(7),
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
});