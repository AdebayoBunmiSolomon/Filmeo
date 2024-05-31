import React, { useContext } from "react";
import { Drawer, drawerScreens, Stack } from "./screen-routes/ScreenRoutes";
import { ThemeContext } from "@src/resources/Theme";
import { font, fontFamily } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { CustomDrawer } from "./Drawer";
import { AppText } from "@src/components/shared";
import { AntDesign, Entypo, MaterialIcons } from "expo-vector-icons";

const DrawerScreens = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      initialRouteName='Drawer-Screens'
      screenOptions={{
        drawerStyle: { width: "80%" },
        drawerType: "front",
        headerShown: false,
        drawerActiveBackgroundColor: "transparent",
        drawerActiveTintColor:
          theme === "dark" ? colors.primaryColor : colors.primaryColor2,
        drawerInactiveTintColor: theme === "dark" ? colors.white : colors.black,
        drawerLabelStyle: {
          fontFamily: fontFamily.source_sans_regular,
          fontSize: font.size16,
        },
      }}
      drawerContent={(props) => <CustomDrawer props={props} />}>
      {drawerScreens &&
        drawerScreens.map((screen, index) => (
          <Drawer.Screen
            key={index.toString()} // Ensure key is a string
            name={screen.name}
            component={screen.component}
            options={{
              drawerLabel: ({ focused }) => (
                <>
                  <AppText
                    sizeMedium
                    fontRegular
                    style={{
                      color:
                        focused && theme === "dark"
                          ? colors.primaryColor2
                          : !focused && theme === "dark"
                          ? colors.white
                          : focused && theme === "light"
                          ? colors.primaryColor
                          : !focused && theme === "light"
                          ? colors.black
                          : undefined,
                    }}>
                    {screen.label}
                  </AppText>
                </>
              ),
              drawerIcon: ({ color }) =>
                screen.iconName === "music" ? (
                  <Entypo
                    name={screen.iconName}
                    size={font.size20}
                    color={color}
                  />
                ) : screen.iconName === "local-movies" ? (
                  <MaterialIcons
                    name={screen.iconName}
                    size={font.size20}
                    color={color}
                  />
                ) : (
                  <AntDesign
                    name={screen.iconName}
                    size={font.size20}
                    color={color}
                  />
                ),
            }}></Drawer.Screen>
        ))}
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
