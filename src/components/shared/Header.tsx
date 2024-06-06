import { DVW, layout, moderateScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { AppText } from "./AppText";
import { getGreetings, truncateText } from "@src/helper/helper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

type headerProps = {
  backHeader: boolean;
  title: string;
  showUsername?: boolean;
};

export const Header: React.FC<headerProps> = ({
  backHeader,
  title,
  showUsername,
}) => {
  const { theme } = useContext(ThemeContext);
  const navigation: NavigationProp<any> = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: moderateScale(5),
          }}>
          <TouchableOpacity
            onPress={() => (backHeader ? goBack() : openDrawer())}>
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
                  source={require("@src/assets/images/experience.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            )}
          </TouchableOpacity>
          <AppText fontBold sizeMedium mainColor>
            {title}
          </AppText>
          {showUsername && (
            <AppText sizeMedium fontBold black>
              {truncateText(`Adebayo Bunmi Solomon`)}
            </AppText>
          )}
        </View>
        <TouchableOpacity>
          <Ionicons
            name='notifications'
            size={layout.size20}
            color={theme === "dark" ? colors.gray : colors.gray}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerTitle}>
        {backHeader ? null : (
          <React.Fragment>
            <AppText sizeSmall fontBold black>
              {getGreetings().time}
            </AppText>
          </React.Fragment>
        )}
      </View>
    </>
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
});
