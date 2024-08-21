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
  nestedNavigation:
    | {
        name: string;
        label: string;
      }[]
    | null;
};

export const drawerScreens: DrawerScreen[] = [
  {
    name: "DrawerScreens-Home",
    component: BottomTabs,
    label: "Home",
    iconName: "home",
    nestedNavigation: null,
  },
  {
    name: "Music",
    component: DrawerScreen.Music,
    label: "Music",
    iconName: "music",
    nestedNavigation: null,
  },
  {
    name: "Movies",
    component: DrawerScreen.SearchMovies,
    label: "Search",
    iconName: "search",
    nestedNavigation: [
      {
        name: "SearchMovies",
        label: "Movies",
      },
      {
        name: "SearchPeople",
        label: "People",
      },
      {
        name: "ExtensiveSearch",
        label: "Extensive Search",
      },
    ],
  },
  {
    name: "Certifications",
    component: DrawerScreen.MovieCertification,
    label: "Certifications",
    iconName: "star",
    nestedNavigation: null,
  },
  {
    name: "WatchList",
    component: DrawerScreen.WatchList,
    label: "Watch List",
    iconName: "heart",
    nestedNavigation: null,
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
  {
    screenName: "Test",
    component: RootStackScreen.Test,
  },
  {
    screenName: "CastInformation",
    component: RootStackScreen.CastInfo,
  },
  {
    screenName: "ExtensiveViewMore",
    component: RootStackScreen.ExtensiveViewMore,
  },
  {
    screenName: "EditDetails",
    component: RootStackScreen.EditDetails,
  },
];
