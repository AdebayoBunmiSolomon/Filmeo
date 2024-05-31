import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  NavigationProp,
  CommonActions,
} from "@react-navigation/native";

export const useLogin = () => {
  const navigation: NavigationProp<any> = useNavigation();

  const Login = async () => {
    try {
      const userIsLoggedInToDevice = await AsyncStorage.getItem(
        "@userLoggedIn"
      );
      const parsedUserIsLoggedInToDevice = JSON.parse(userIsLoggedInToDevice!);
      if (parsedUserIsLoggedInToDevice === null) {
        await AsyncStorage.setItem("@userLoggedIn", JSON.stringify(true));
        console.log("user logged in successfully");
        //route to AppStack here if Login successful
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Drawer-Screens" }],
          })
        );
      }
    } catch (err) {
      console.log("Error processing if user is logged in", err);
    }
  };

  return {
    Login,
  };
};
