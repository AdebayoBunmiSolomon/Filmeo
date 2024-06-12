import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
import { likedMovieDataType } from "@src/types/types";

export const truncateText = (str: string) => {
  if (str.length > 20) {
    return str.substring(0, 15) + "....";
  } else if (str.length > 12) {
    return str.substring(0, 7) + "....";
  } else {
    return str;
  }
};

/**
 * returns the greeting based on the time of day
 * e.g. "Good morning", "Good afternoon", "Good evening"
 */
export const getGreetings = () => {
  const date = new Date();
  let hours = date.getHours();

  if (hours >= 0 && hours < 12) {
    return {
      time: "Good Morning 🌤️",
    };
  } else if (hours >= 12 && hours < 14) {
    return {
      time: "Good Afternoon 🌅",
    };
  } else {
    return {
      time: "Good Evening 🌗",
    };
  }
};

/**
 *
 * @returns true if user is logged in on device.
 * false if user is not logged in on device
 */
export const isUserLoggedInOnDevice = async () => {
  try {
    const isUserLoggedInOnDevice = await AsyncStorage.getItem(
      storageKey.AUTHENTICATED
    );
    const parsedIsUserLoggedInOnDevice = JSON.parse(isUserLoggedInOnDevice!);
    if (parsedIsUserLoggedInOnDevice !== null) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 *
 * @returns an array list of watch list liked by the user
 */
export const getUserWatchList = async () => {
  const watchList = await AsyncStorage.getItem(storageKey.WATCH_LIST);
  const parsedData = JSON.parse(watchList!);
  if (parsedData !== null) {
    return parsedData;
  } else {
    return [];
  }
};

/**
 * returns the filtered list of watch-list
 */
export const filterWatchList = (
  watchList: likedMovieDataType[],
  movieId: number
): likedMovieDataType[] => {
  return watchList.filter((movie) => movie.id !== movieId);
};
/**
 * @returns the Year from a date value
 */
export const getYearFromDateValue = (dateVal: string) => {
  const date = new Date(dateVal);
  const year = date.getFullYear();
  return year;
};

/**
 * This appends the IMAGE_BASE_URL to the file_path and changes the key
 * to uri so as the Image viewer to recognize the remote url for image viewing
 */
export const appendBaseUrlToMovieImagesList = (
  dataArr: any,
  baseURL: string
) => {
  return dataArr.map((movieImgList: any) => ({
    ...movieImgList, //spread the existing properties(e.g., aspect_ration & the likes)
    uri: `${baseURL}${movieImgList.file_path}`,
  }));
};

/**
 * This appends the IMAGE_BASE_URL to the profile_path and changes the key
 * to uri so as the Image viewer to recognize the remote url for image viewing
 */
export const appendBaseUrlToMovieCastList = (dataArr: any, baseURL: string) => {
  return dataArr.map((movieCastList: any) => ({
    ...movieCastList, //spread the existing properties(e.g., aspect_ration & the likes)
    uri: `${baseURL}${movieCastList.profile_path}`,
  }));
};
