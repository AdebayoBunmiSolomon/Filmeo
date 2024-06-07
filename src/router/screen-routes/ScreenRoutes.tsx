import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { DrawerStackScreenParamList, RootStackParamList } from "../Types";
import * as DrawerScreen from "@src/screens/app/Drawer-Screens";
import * as RootStackScreen from "@src/screens/app";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabs } from "../Bottom-Tab";

export const Drawer = createDrawerNavigator<DrawerStackScreenParamList>();
export const Stack = createNativeStackNavigator<RootStackParamList>();

//Drawer-Stack
type DrawerScreen = {
  name: keyof DrawerStackScreenParamList;
  component: React.ComponentType<any>;
  label: string;
  iconName: string; // Specify iconName type as string
  nestedNavigation: boolean;
};

export const drawerScreens: DrawerScreen[] = [
  {
    name: "DrawerScreens-Home",
    component: BottomTabs,
    label: "Home",
    iconName: "home",
    nestedNavigation: false,
  },
  {
    name: "Music",
    component: DrawerScreen.Music,
    label: "Music",
    iconName: "music",
    nestedNavigation: false,
  },
  {
    name: "Movies",
    component: DrawerScreen.Movies,
    label: "Movies",
    iconName: "local-movies",
    nestedNavigation: false,
  },
  {
    name: "Ratings",
    component: DrawerScreen.Ratings,
    label: "Ratings",
    iconName: "star",
    nestedNavigation: false,
  },
  {
    name: "WatchList",
    component: DrawerScreen.WatchList,
    label: "Watch List",
    iconName: "heart",
    nestedNavigation: false,
  },
];

//Screen-Stack
type ScreenConfig = {
  screenName: keyof RootStackParamList;
  component: React.ComponentType<any>;
};

export const otherScreen: ScreenConfig[] = [
  {
    screenName: "ViewMore",
    component: RootStackScreen.ViewMore,
  },
];
