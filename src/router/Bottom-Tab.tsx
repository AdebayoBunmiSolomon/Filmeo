import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { DVH, font, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { BlurView } from "expo-blur";
import { View, StyleSheet } from "react-native";
import { AppText } from "@src/components/shared";
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
        focused
          ? theme === "dark"
            ? colors.primaryColor2
            : colors.primaryColor
          : theme === "dark"
          ? colors.gray
          : colors.gray
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
          backgroundColor: theme === "dark" ? colors.black : colors.lightGray,
          marginLeft: font.size30,
          marginRight: font.size30,
          bottom: DVH(4),
          borderRadius: font.size50,
        },
        tabBarBackground: () => (
          <>
            {theme === "dark" && (
              <BlurView
                tint='dark'
                intensity={1}
                style={{ backgroundColor: colors.black }}
              />
            )}
          </>
        ),
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarLabel: ({ focused }) =>
          focused ? (
            <View
              style={[
                styles.focusedTab,
                {
                  backgroundColor:
                    theme === "dark"
                      ? colors.primaryColor2
                      : colors.primaryColor,
                },
              ]}
            />
          ) : (
            <AppText
              sizeSmall
              mainColor
              fontSemibold
              style={[
                {
                  color: focused ? colors.primaryColor2 : colors.gray,
                },
              ]}>
              {route.name}
            </AppText>
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
    borderRadius: 50,
  },
});
