import { type ParamListBase } from "@react-navigation/native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type DrawerScreenProps } from "@react-navigation/drawer";
import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";

//Authentication screen stack
export interface AuthStackParamList extends ParamListBase {
  Onboarding: undefined;
  Login: undefined;
  RegisterFlowOne: undefined;
  Otp: {
    data: { email: string; fullName: string; phoneNumber: string };
  };
  RegisterFlowTwo: {
    data: { email: string; fullName: string; phoneNumber: string };
  };
  GetStarted: undefined;
}

export type AuthScreenProps<ScreenName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, ScreenName>;

//Application screen stack
export interface RootStackParamList extends ParamListBase {
  ViewMore: {
    movieId: number;
  };
  Test: undefined;
  CastInformation: {
    castId: number;
  };
  ExtensiveViewMore: {
    tvSeriesId: number;
  };
  EditDetails: undefined;
}

export type RootStackScreenProps<ScreenName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, ScreenName>;

//Bottom-tabBar screen stack
export interface BottomTabBarParamList extends ParamListBase {
  Home: undefined;
  About: undefined;
  Settings: undefined;
}

export type BottomTabBarScreenProps<
  ScreenName extends keyof BottomTabBarParamList
> = BottomTabScreenProps<BottomTabBarParamList, ScreenName>;

//Drawer-navigator screen stack
export interface DrawerStackScreenParamList extends ParamListBase {
  Home: undefined;
  SearchMovies: undefined;
  SearchPeople: undefined;
  Music: undefined;
  MovieCertification: undefined;
  WatchList: undefined;
  ExtensiveSearch: undefined;
}

export type DrawerStackScreenProps<
  ScreenName extends keyof DrawerStackScreenParamList
> = DrawerScreenProps<DrawerStackScreenParamList, ScreenName>;
