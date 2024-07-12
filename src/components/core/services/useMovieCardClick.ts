import { NavigationProp, useNavigation } from "@react-navigation/native";

export const useMovieCardClick = () => {
  const navigation: NavigationProp<any> = useNavigation();

  const movieCardClick = (id: number, media_type: string) => {
    if (media_type !== "movie") {
      navigation.navigate("ExtensiveViewMore", {
        tvSeriesId: id,
      });
    } else {
      navigation.navigate("ViewMore", {
        movieId: id,
      });
    }
  };
  return {
    movieCardClick,
  };
};
