import { onboardingScreenType } from "@src/types/types";

export const onboardingScreenSlides: onboardingScreenType[] = [
  {
    id: 1,
    image: require("@src/assets/images/tv.png"),
    title: "Check Trending Movies",
    subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 2,
    image: require("@src/assets/images/music.png"),
    title: "Play & Listen to Local MP3",
    subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 3,
    image: require("@src/assets/images/experience.png"),
    title: "Enjoy Smooth Experience",
    subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
];

export const trendingMovieTimeWindow = [
  {
    id: 1,
    name: "day",
  },
  {
    id: 2,
    name: "week",
  },
];
