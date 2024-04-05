import { ImageSourcePropType } from "react-native";

export interface loaderProps {
  sizes: "large" | "small";
  color: string;
}

export type onboardingScreenType = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  subTitle: string;
};

export interface slideProps {
  data: onboardingScreenType;
}
