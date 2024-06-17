import React, { useContext } from "react";
import {
  Drawer,
  drawerScreens,
  otherScreen,
  Stack,
} from "./screen-routes/ScreenRoutes";
import { ThemeContext } from "@src/resources/Theme";
import { CustomDrawer } from "./Drawer";
import * as SubItemDrawerScreens from "@src/screens/app/Drawer-Screens";

const DrawerScreens = () => {
  const { theme } = useContext(ThemeContext);
  // const isDrawerOpen = useDrawerStatus() === "open";
  return (
    <Drawer.Navigator
      initialRouteName='Drawer-Screens'
      screenOptions={{
        drawerStyle: { width: "80%" },
        drawerType: "front",
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer props={props} />}>
      {drawerScreens &&
        drawerScreens.map((screen, index) => (
          <Drawer.Screen
            key={index.toString()} // Ensure key is a string
            name={screen.name}
            component={screen.component}
          />
        ))}
      <Drawer.Screen
        name={"SearchMovies"}
        component={SubItemDrawerScreens.SearchMovies}
      />
      <Drawer.Screen
        name={"SearchPeople"}
        component={SubItemDrawerScreens.SearchPeople}
      />
    </Drawer.Navigator>
  );
};

const StackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='DrawerScreens'
        component={DrawerScreens}
        options={{ headerShown: false }}
      />
      {otherScreen &&
        otherScreen.map((screen, index) => (
          <Stack.Screen
            name={screen.screenName}
            component={screen.component}
            key={index}
            options={{ headerShown: false }}
          />
        ))}
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <>
      <StackScreens />
    </>
  );
};
