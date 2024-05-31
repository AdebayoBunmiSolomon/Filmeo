import AsyncStorage from "@react-native-async-storage/async-storage";

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
      time: "Good Morning 🌤️,",
    };
  } else if (hours >= 12 && hours < 14) {
    return {
      time: "Good Afternoon 🌅,",
    };
  } else {
    return {
      time: "Good Evening 🌗,",
    };
  }
};

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
