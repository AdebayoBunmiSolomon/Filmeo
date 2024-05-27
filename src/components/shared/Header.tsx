import { layout, moderateScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { AppText } from "./AppText";
import { getGreetings } from "@src/helper/helper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

type headerProps = {
  backHeader: boolean;
  title: string;
};

export const Header: React.FC<headerProps> = ({ backHeader, title }) => {
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
              <EvilIcons
                name='navicon'
                size={moderateScale(25)}
                color={
                  theme === "dark" ? colors.primaryColor : colors.primaryColor2
                }
              />
            )}
          </TouchableOpacity>
          <AppText fontSemibold sizeMedium mainColor>
            {title}
          </AppText>
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
            <AppText sizeSmall fontRegular gray>
              @adebayobunmi
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
});
