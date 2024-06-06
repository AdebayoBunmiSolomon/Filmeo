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
  // const minutes = date.getMinutes();
  // const amPm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  // hours = hours % 12;
  // hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format hours and minutes with leading zeros if necessary
  // const formattedHours = hours.toString().padStart(2, "0");
  // const formattedMinutes = minutes.toString().padStart(2, "0");

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
