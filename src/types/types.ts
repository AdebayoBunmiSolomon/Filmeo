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

export type likedMovieDataType = {
  id: number;
  title: string;
  videoImgUrl: string;
};

export type certificationType = {
  certification: string;
  meaning: string;
  order: number;
}[];

export type dataStructure = {
  certifications: {
    FR: certificationType;
    GB: certificationType;
    HU: certificationType;
    IN: certificationType;
    IT: certificationType;
    LT: certificationType;
    MY: certificationType;
    NL: certificationType;
    NO: certificationType;
    NZ: certificationType;
    PH: certificationType;
    PT: certificationType;
    RU: certificationType;
    SE: certificationType;
    US: certificationType;
    KR: certificationType;
    SK: certificationType;
    TH: certificationType;
    MX: certificationType;
    ID: certificationType;
    TR: certificationType;
    AR: certificationType;
    GR: certificationType;
    TW: certificationType;
    ZA: certificationType;
    SG: certificationType;
    IE: certificationType;
    PR: certificationType;
    JP: certificationType;
    VI: certificationType;
    CH: certificationType;
    IL: certificationType;
    HK: certificationType;
    MO: certificationType;
    LV: certificationType;
    LU: certificationType;
    CZ: certificationType;
    AT: certificationType;
    CL: certificationType;
    UA: certificationType;
    RO: certificationType;
    PL: certificationType;
  };
};

export type settingsType = {
  title: string;
  icon: React.ElementType;
  function: () => void;
}[];
