import { NavigationProp, useNavigation } from "@react-navigation/native";

export const useMovieCardClick = () => {
  const navigation: NavigationProp<any> = useNavigation();

  const movieCardClick = (id: number, media_type?: string) => {
    console.log(media_type);
    //this works for movies that does not have media_type key value or undefined
    //which then applies to upcoming, trending, and search movies
    if (media_type === undefined) {
      navigation.navigate("ViewMore", {
        movieId: id,
      });
    } else {
      //this condition is movies that has media_type key value which is not undefined.
      //which then applies to extensive search only
      if (media_type === "movie") {
        navigation.navigate("ViewMore", {
          movieId: id,
        });
      } else {
        navigation.navigate("ExtensiveViewMore", {
          tvSeriesId: id,
        });
      }
    }
  };
  return {
    movieCardClick,
  };
};
