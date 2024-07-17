import React, { useEffect, useState } from "react";
import { Screen } from "../../Screen";
import { BottomTabBarScreenProps } from "@src/router/Types";
import { AppText, Header } from "@src/components/shared";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { DVH, DVW, layout, verticalScale } from "@src/resources";
import { aboutUs } from "@src/constant/data";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

export const About = ({}: BottomTabBarScreenProps<"About">) => {
  const [show, setShow] = useState<boolean>(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setShow(false);
      const timer = setTimeout(() => {
        setShow(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isFocused]);
  return (
    <Screen>
      <Header backHeader={true} title='About' />
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: verticalScale(75),
          gap: verticalScale(10),
        }}>
        <View style={styles.container}>
          <Image
            source={require("@src/assets/icons/cinema.png")}
            resizeMode='contain'
            style={styles.image}
          />
          <AppText fontRegular sizeBody gray style={styles.topText}>
            Welcome to Filmeo, your ultimate destination for all things movies
            and series! Whether you're a cinephile, a binge-watcher, or someone
            who loves to keep up with the latest entertainment trends, Filmeo
            has got you covered.
          </AppText>
        </View>
        <View>
          {aboutUs &&
            aboutUs.map(
              (items, index) =>
                show && (
                  <Animated.View
                    entering={FadeIn.delay(100).damping(5)}
                    key={index}
                    style={{
                      flexDirection: "column",
                      marginBottom: verticalScale(10),
                    }}>
                    <AppText fontBold sizeBody>
                      {items.title}:
                    </AppText>
                    <AppText fontRegular sizeBody gray style={styles.topText}>
                      {items.description}
                    </AppText>
                  </Animated.View>
                )
            )}
        </View>
        <View>
          <AppText style={styles.topText} fontRegular sizeBody>
            At Filmeo, we are passionate about bringing the world of cinema and
            television to your fingertips. Our goal is to enhance your viewing
            experience by providing comprehensive and up-to-date information on
            a wide range of entertainment content. Thank you for choosing
            Filmeo. Sit back, relax, and enjoy the show!
          </AppText>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  topText: {
    textAlign: "justify",
  },
  container: {
    flex: 0.7,
    alignItems: "center",
    gap: layout.size18,
  },
  image: {
    width: DVW(20),
    height: DVH(10),
  },
});
