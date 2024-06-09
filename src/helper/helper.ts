import AsyncStorage from "@react-native-async-storage/async-storage";
import { likedMovieDataType } from "@src/types/types";

export const truncateText = (str: string) => {
  return str.length > 20 ? str.substring(0, 15) + "...." : str;
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
 * @returns boolean value from if user is logged in on the device
 */
export const isUserLoggedInOnDevice = async () => {
  try {
    const isUserLoggedInOnDevice = await AsyncStorage.getItem("@userLoggedIn");
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
  const watchList = await AsyncStorage.getItem("@watchList");
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

export const getYearFromDateValue = (dateVal: string) => {
  const date = new Date(dateVal);
  const year = date.getFullYear();
  return year;
};

export const appendBaseUrlToMovieImagesList = (
  dataArr: any,
  baseURL: string
) => {
  return dataArr.map((movieImgList: any) => ({
    ...movieImgList, //spread the existing properties(e.g., aspect_ration & the likes)
    uri: `${baseURL}${movieImgList.file_path}`,
  }));
};
