import { DVW, layout, moderateScale, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { AppText } from "./AppText";
import { getGreetings, truncateText } from "@src/helper/helper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { useUserDataStore } from "@src/hooks/store";

type headerProps = {
  backHeader: boolean;
  title: string;
  showUsername?: boolean;
  showRightIcon?: boolean;
};

export const Header: React.FC<headerProps> = ({
  backHeader,
  title,
  showUsername,
  showRightIcon,
}) => {
  const { theme } = useContext(ThemeContext);
  const { userData } = useUserDataStore();
  const navigation: NavigationProp<any> = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        paddingBottom: verticalScale(0.2),
      }}>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: moderateScale(5),
          }}>
          <TouchableOpacity
            onPress={() => (backHeader ? goBack() : openDrawer())}
            style={styles.btn}>
            {backHeader ? (
              <Ionicons
                name='chevron-back'
                size={moderateScale(25)}
                color={
                  theme === "dark" ? colors.primaryColor : colors.primaryColor2
                }
              />
            ) : (
              <View
                style={[
                  styles.userImgContainer,
                  {
                    borderColor:
                      theme === "dark"
                        ? colors.primaryColor2
                        : colors.primaryColor,
                  },
                ]}>
                <Image
                  resizeMode='contain'
                  source={
                    userData && userData.avatar_url
                      ? { uri: userData.avatar_url }
                      : require("@src/assets/images/experience.png")
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            )}
            <AppText fontBold sizeMedium mainColor>
              {title}
            </AppText>
          </TouchableOpacity>
          <View>
            {showUsername && (
              <AppText sizeMedium fontBold black>
                {truncateText(userData && String(userData.fullname))}
              </AppText>
            )}
            {backHeader ? null : (
              <React.Fragment>
                <AppText
                  sizeSmall
                  fontBold
                  black
                  style={{
                    marginTop: verticalScale(-5),
                  }}>
                  {getGreetings().time}
                </AppText>
              </React.Fragment>
            )}
          </View>
        </View>
        {showRightIcon && (
          <TouchableOpacity>
            <Ionicons
              name='notifications'
              size={layout.size20}
              color={theme === "dark" ? colors.gray : colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(4),
    marginLeft: moderateScale(5),
  },
  userImgContainer: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderWidth: DVW(0.3),
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
});
