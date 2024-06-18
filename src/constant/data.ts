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

export const imagesArr = [
  {
    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  },
  {
    uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
  },
];

export const includeAdult = [
  {
    name: "Yes",
  },
  {
    name: "No",
  },
];
