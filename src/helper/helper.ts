import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache";
import {
  xtensiveMovieMediaTypeData,
  xtensiveMovieOtherTypeData,
  xtensiveSearchDataType,
} from "@src/functions/api/store";
import { certificationType, likedMovieDataType } from "@src/types/types";

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
    console.log("Error", err);
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

type DataStructure = {
  certifications: {
    [key: string]: certificationType;
  };
};

export const extractCertification = (
  data: DataStructure
): { countryCode: string; certifications: certificationType }[] => {
  return Object.entries(data.certifications).map(
    ([countryCode, certArray]) => ({
      countryCode,
      certifications: certArray,
    })
  );
};

export const returnBooleanConstraintsForYesOrNoSelection = (
  selection: string
) => {
  if (selection.toLowerCase() === "yes") {
    return true;
  } else {
    return false;
  }
};

export const calculateAge = (yearOfBirth: number) => {
  const date = new Date();
  const castYOB = yearOfBirth;
  const currYear = date.getFullYear();
  const DOB = currYear - castYOB;
  return DOB.toString();
};

/**
 *
 * converts selected date values from ISo type i.e. 2024-04-19T00:00:00.000Z to HTML date value i.e. 2024-04-19
 */
export const convertDateTimeISOtoHTMLDate = (value: string) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateString = value;
  const dateObject = new Date(dateString);

  // Extract year, month, and day components
  const year = dateObject.getFullYear();
  //const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const monthIndex = dateObject.getMonth();
  const monthName = monthNames[monthIndex];
  const day = String(dateObject.getDate()).padStart(2, "0");

  // Format as YYYY-MM-DD
  const formattedDate = `${year}-${monthName}-${day}`;
  return formattedDate;
};

export const isMediaTypeMovie = (
  item: xtensiveMovieMediaTypeData | xtensiveMovieOtherTypeData
): item is xtensiveMovieMediaTypeData => {
  return (item as xtensiveMovieMediaTypeData).media_type === "movie";
};

export const isMediaTypeOther = (
  item: xtensiveMovieMediaTypeData | xtensiveMovieOtherTypeData
): item is xtensiveMovieOtherTypeData => {
  return (item as xtensiveMovieMediaTypeData).media_type === "tv";
};

/**
 *
 * @param data
 * @returns data of movies that their media_type are 'movie' & 'tv'
 */
export const filterNonMediaTypes = (data: xtensiveSearchDataType) => {
  if (data) {
    const movieResults = data.filter(
      (movies) => movies.media_type === "movie" || movies.media_type === "tv"
    );
    return movieResults;
  }
};

/**
 * This function returns the value of the input string with white spaces
 * without white spaces.. e.g. 'Bunmi Solomon' to 'bunmisolomon'
 */
export const normalizeSpaces = (inputString: string) => {
  return inputString
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
};

/**
 *
 * @param length gives the length or number of characters to be returned
 * @returns a given set of characters randomly
 */
export const generateRandomId = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const characterLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characterLength));
  }
  return result;
};

/**
 *
 * @returns the current date value as in year-month-day
 */
export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleDateString("default", { month: "long" });
  const day = date.getDay();
  const currDate = year + "-" + month + "-" + day;
  return currDate;
};

export const convertInputValueToLowercaseAndRemoveWhiteSpace = (
  value: string
) => {
  const cValueToLowerCase = value.toLocaleLowerCase();
  const removeWhiteSpaceInValue = cValueToLowerCase.trim();
  return removeWhiteSpaceInValue;
};
