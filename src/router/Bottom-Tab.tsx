import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { DVH, font, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { View, StyleSheet, Platform } from "react-native";
import * as Screens from "@src/screens/app";
import { BottomTabBarParamList } from "./Types";

type bottomTabProps = {
  focused: boolean;
  iconType: keyof BottomTabBarParamList;
  theme: string;
};

const Tab = createBottomTabNavigator<BottomTabBarParamList>();

const tabBarIconMapping: Record<
  keyof BottomTabBarParamList,
  { icon: React.ComponentType<any>; name: string }
> = {
  Home: { icon: AntDesign, name: "home" },
  About: { icon: Octicons, name: "info" },
  Settings: { icon: Feather, name: "settings" },
};

const TabBarIcon: React.FC<bottomTabProps> = ({ focused, iconType, theme }) => {
  const { icon: TabIcon, name: iconName } = tabBarIconMapping[iconType];

  if (!TabIcon) {
    console.warn(`Icon type '${iconType}' not found in tabBarIconMapping.`);
    return null;
  }

  const tabIconSize = font.size20;

  return (
    <TabIcon
      name={iconName}
      size={tabIconSize}
      color={
        theme === "light" && focused
          ? colors.white
          : theme === "light" && !focused
          ? colors.gray
          : theme === "dark" && focused
          ? colors.white
          : theme === "dark" && !focused
          ? colors.gray
          : undefined
      }
    />
  );
};

export const BottomTabs: React.FC<{}> = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          backgroundColor:
            theme === "dark" ? colors.primaryColor : colors.primaryColor2,
          marginLeft: font.size30,
          marginRight: font.size30,
          bottom: Platform.OS === "ios" ? verticalScale(20) : verticalScale(10),
          borderRadius: font.size50,
          height: Platform.OS === "ios" ? DVH(7) : DVH(7.5),
          paddingVertical: verticalScale(5),
          paddingBottom: verticalScale(10),
        },
        headerShown: false,
        tabBarLabel: ({ focused }) =>
          focused && (
            <View
              style={[
                styles.focusedTab,
                {
                  backgroundColor:
                    theme === "light" && focused
                      ? colors.white
                      : theme === "light" && !focused
                      ? colors.gray
                      : theme === "dark" && focused
                      ? colors.white
                      : theme === "dark" && !focused
                      ? colors.gray
                      : undefined,
                },
              ]}
            />
          ),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            iconType={route.name as keyof BottomTabBarParamList}
            theme={theme}
          />
        ),
      })}>
      <Tab.Screen name='Home' component={Screens.Home} />
      <Tab.Screen name='About' component={Screens.About} />
      <Tab.Screen name='Settings' component={Screens.Settings} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  focusedTab: {
    padding: font.size4,
    marginTop: 6,
    borderRadius: 50,
  },
});
