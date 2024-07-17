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

export const searchFilterButton = [
  {
    name: "Search Query",
  },
  {
    name: "Include Adult",
  },
  {
    name: "Release Year",
  },
  {
    name: "Region",
  },
];

export const adultSelection = [
  {
    title: "Yes",
  },
  {
    title: "No",
  },
];

export const aboutUs = [
  {
    title: "Trending Movies",
    description:
      "Stay updated with the hottest movies that everyone is talking about.",
  },
  {
    title: "Upcoming Movies",
    description:
      "Never miss out on future blockbusters. Get the scoop on movies that are set to hit the screens soon.",
  },
  {
    title: "Search for Movies and Series",
    description:
      "Looking for something specific? Use our search feature to find any movie or series in our extensive database.",
  },
  {
    title: "Watch Trailers",
    description:
      "Get a sneak peek of movies and series with our high-quality trailers.",
  },
  {
    title: "Create a Watch List",
    description:
      "Keep track of what you want to watch next by adding movies and series to your personalized watch list.",
  },
  {
    title: "Cast Information",
    description:
      "Interested in knowing more about your favorite actors? Search for cast members and explore their biographies and filmographies.",
  },
];
