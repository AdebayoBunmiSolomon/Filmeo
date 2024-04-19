import { AuthScreenProps } from "@src/router/Types";
import React, { useContext, useState } from "react";
import { Screen } from "../Screen";
import { Image, StyleSheet, View } from "react-native";
import { Header } from "@src/components/auth";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { DVW, layout } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { AppButton, AppText, DropDown } from "@src/components/shared";
import { useVisibility } from "@src/hooks/state";
import { SheetModal } from "@src/components/core";

export const GetStarted = ({ navigation }: AuthScreenProps<"GetStarted">) => {
  const { theme } = useContext(ThemeContext);
  const { dropDownVisible, onToggleDropDownVisible } = useVisibility();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <>
      <Screen>
        <Header
          onPress={() => navigation.goBack()}
          title='Get Started'
          rightIcon={
            <FontAwesome
              name='user-circle'
              size={layout.size26}
              color={
                theme === "dark" ? colors.primaryColor : colors.primaryColor2
              }
            />
          }
          onPressRightIcon={() => onToggleDropDownVisible()}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            gap: layout.size10,
          }}>
          <View>
            <Image
              source={require("@src/assets/images/get-started.png")}
              resizeMode='contain'
              style={styles.image}
            />
          </View>

          <View style={styles.buttonContainer}>
            <AppButton
              title='Login'
              onPress={() => {
                navigation.navigate("Login");
              }}
              rightIcon={
                <FontAwesome
                  name='universal-access'
                  color={theme === "dark" ? colors.white : colors.white}
                  size={layout.size20}
                />
              }
            />
            <AppButton
              title='Register'
              onPress={() => {
                // navigation.navigate("RegisterFlowOne");
                setIsModalVisible(!isModalVisible);
              }}
              outline
              rightIcon={
                <MaterialIcons
                  name='app-registration'
                  color={
                    theme === "dark"
                      ? colors.primaryColor
                      : colors.primaryColor2
                  }
                  size={layout.size20}
                />
              }
            />
          </View>
        </View>
      </Screen>

      <DropDown
        visible={dropDownVisible}
        onCloseDropDown={() => {
          onToggleDropDownVisible();
        }}
        data={[
          {
            title: "Contact & Support",
            onPress: () => console.log("Drop down 1"),
          },
          {
            title: "Ratings",
            onPress: () => console.log("Drop down 2"),
          },
          {
            title: "FAQs",
            onPress: () => console.log("Drop down 3"),
          },
        ]}
      />
      <SheetModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        snapHeight={"18%"}>
        <>
          <AppText fontBold sizeLarge mainColor>
            Welcome onboard.
          </AppText>
          <AppText fontBold sizeLarge black>
            T for Thanks!!!
          </AppText>
        </>
      </SheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: DVW(80),
    alignSelf: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    gap: layout.size14,
    alignItems: "center",
    paddingBottom: layout.size14,
  },
});
