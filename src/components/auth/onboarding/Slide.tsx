import { slideProps } from "@src/types/types";
import React from "react";
import { AppText } from "../../shared";
import { StyleSheet, View, Image } from "react-native";
import { DVW, layout, screenWidth, verticalScale } from "@src/resources";

export const Slide: React.FC<slideProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Image source={data.image} resizeMode='center' style={styles.image} />
      <View style={styles.slideInfoContainer}>
        <AppText fontSemibold sizeLarge>
          {data.title}
        </AppText>
        <AppText fontRegular sizeSmall gray style={styles.subTitle}>
          {data.subTitle}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  slideInfoContainer: {
    marginTop: verticalScale(-45),
  },
  image: {
    height: "75%",
    width: screenWidth - 30,
  },
  subTitle: {
    maxWidth: DVW(80),
    textAlign: "center",
    lineHeight: layout.size22,
  },
});
