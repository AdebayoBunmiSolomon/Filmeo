import { AppText } from "@src/components/shared";
import { castInfoDataType } from "@src/functions/api/store";
import { DVH, moderateScale, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type bioGraphyProps = {
  castData: castInfoDataType;
};

export const BioGraphy: React.FC<bioGraphyProps> = ({ castData }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? colors.black : colors.white,
        },
      ]}>
      <AppText fontSemibold sizeSmall>
        Biography:
      </AppText>
      <View style={styles.biographyContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <AppText fontLight sizeSmall style={styles.biographyText}>
            {castData.biography}
          </AppText>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: DVH(30),
    position: "absolute",
    bottom: verticalScale(40),
    gap: moderateScale(10),
  },
  biographyContainer: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(5),
  },
  scrollContainer: {
    flexGrow: 1,
    borderRadius: moderateScale(10),
  },
  biographyText: {
    textAlign: "justify",
  },
});
