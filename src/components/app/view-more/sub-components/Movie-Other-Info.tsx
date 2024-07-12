import { AppText } from "@src/components/shared";
import { moderateScale, verticalScale } from "@src/resources";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

type movieOtherInfoProps = {
  numberOfSeasons: any;
  numberOfEpisodes: any;
  productionCountries: any[];
  spokenLanguages: any[];
};

export const MovieOtherInfo: React.FC<movieOtherInfoProps> = ({
  numberOfSeasons,
  numberOfEpisodes,
  productionCountries,
  spokenLanguages,
}) => {
  return (
    <View
      style={{
        marginBottom:
          Platform.OS === "ios" ? verticalScale(-10) : verticalScale(-27),
      }}>
      <View style={styles.otherInfoSubContainer}>
        <AppText fontSemibold gray sizeSmall>
          Number of Seasons:
        </AppText>
        <AppText fontRegular mainColor sizeSmall>
          {numberOfSeasons}
        </AppText>
      </View>
      <View style={styles.otherInfoSubContainer}>
        <AppText fontSemibold gray sizeSmall>
          Number of Episodes:
        </AppText>
        <AppText fontRegular mainColor sizeSmall>
          {numberOfEpisodes}
        </AppText>
      </View>
      <View
        style={[
          styles.otherInfoSubContainer,
          {
            flexWrap: "wrap",
          },
        ]}>
        <AppText fontSemibold gray sizeSmall>
          Production Countries:
        </AppText>
        {productionCountries &&
          productionCountries.map((items, index) => (
            <AppText key={index} fontRegular mainColor sizeSmall>
              {items.name} ,
            </AppText>
          ))}
      </View>
      <View
        style={[
          styles.otherInfoSubContainer,
          {
            flexWrap: "wrap",
          },
        ]}>
        <AppText fontSemibold gray sizeSmall>
          Spoken Languages:
        </AppText>
        {spokenLanguages &&
          spokenLanguages.map((items, index) => (
            <AppText key={index} fontRegular mainColor sizeSmall>
              {items.name} ,
            </AppText>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otherInfoContainer: {},
  otherInfoSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
});
