import { AppText } from "@src/components/shared";
import { castInfoDataType } from "@src/functions/api/store";
import { calculateAge, getYearFromDateValue } from "@src/helper/helper";
import { moderateScale, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

type bioDataProps = {
  castData: castInfoDataType;
};

export const BioData: React.FC<bioDataProps> = ({ castData }) => {
  return (
    <>
      <View style={styles.castDetailsTopContainer}>
        <AppText fontBold sizeLarge style={styles.castName}>
          {castData.name}
        </AppText>
      </View>
      <View style={styles.bioData}>
        <AppText fontSemibold sizeBody gray>
          Gender:
        </AppText>
        <AppText fontLight sizeMedium>
          {castData.gender === 2 ? "Male" : "Female"}
        </AppText>
      </View>
      <View style={styles.bioData}>
        <AppText fontSemibold sizeBody gray>
          Birthday:
        </AppText>
        <AppText fontLight sizeBody>
          {castData.birthday}
        </AppText>
      </View>
      <View style={styles.bioData}>
        <AppText fontSemibold sizeBody gray>
          Birth Place:
        </AppText>
        <AppText fontLight sizeBody>
          {castData.place_of_birth}
        </AppText>
      </View>
      <View style={styles.bioData}>
        <AppText fontSemibold sizeBody gray>
          Dead:
        </AppText>
        <AppText
          fontSemibold
          sizeBody
          style={{
            color: castData.deathday ? colors.danger : "mediumspringgreen",
          }}>
          {castData.deathday ? `True - ${castData.deathday}` : "False"}
        </AppText>
      </View>
      <View style={styles.bioData}>
        <AppText fontSemibold sizeBody gray>
          Age:
        </AppText>
        <AppText fontLight sizeBody>
          {calculateAge(getYearFromDateValue(castData.birthday))}
        </AppText>
      </View>
      <View style={styles.bioData}>
        <AppText fontSemibold sizeBody gray>
          Known For:
        </AppText>
        <AppText fontLight sizeBody>
          {castData.known_for_department}
        </AppText>
      </View>
      <View style={styles.biographyContainer}>
        <AppText fontSemibold sizeBody gray>
          Biography:
        </AppText>
        <AppText fontLight sizeBody style={styles.biographyText}>
          {castData.biography}
        </AppText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  castDetailsTopContainer: {
    maxWidth: "80%",
    alignSelf: "center",
    gap: moderateScale(10),
    marginTop: verticalScale(10),
  },
  castName: {
    maxWidth: "100%",
    textAlign: "center",
  },
  bioData: {
    flexDirection: "row",
    gap: moderateScale(10),
  },
  biographyContainer: {
    flexDirection: "column",
  },
  biographyText: {
    textAlign: "justify",
  },
});
