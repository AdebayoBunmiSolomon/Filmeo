import { IMAGE_BASE_URL } from "@env";
import { Error } from "@src/common";
import {
  BioData,
  BioGraphy,
  CombinedCredits,
} from "@src/components/app/Cast-Info";
import { Loader } from "@src/components/core";
import { Header } from "@src/components/shared";
import { useGetCastInformation } from "@src/functions/api/services/movies/useGetCastInfo";
import { DVH, DVW, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { RootStackScreenProps } from "@src/router/Types";
import { Screen } from "@src/screens/Screen";
import React, { useContext, useEffect } from "react";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";

export const CastInfo = ({
  route,
}: RootStackScreenProps<"CastInformation">) => {
  const { castId } = route.params;
  const { getCastInfoData, castInfoData, loading, isError } =
    useGetCastInformation();
  const { theme } = useContext(ThemeContext);
  console.log(castId);

  useEffect(() => {
    getCastInfoData(castId);
  }, [castId]);

  return (
    <Screen>
      <Header title='Cast Information' backHeader />
      {loading ? (
        <Loader
          sizes='large'
          color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
        />
      ) : isError ? (
        <Error
          errTitle='Error loading cast information'
          onRefresh={() => getCastInfoData(castId)}
        />
      ) : (
        <>
          <View
            style={{
              height: "70%",
              paddingBottom: verticalScale(90),
            }}>
            <ScrollView
              style={{
                flexGrow: 1,
              }}
              showsVerticalScrollIndicator={false}>
              <View
                style={[
                  styles.imgContainer,
                  {
                    borderColor:
                      theme === "dark"
                        ? colors.primaryColor2
                        : colors.primaryColor,
                  },
                ]}>
                <Image
                  source={{
                    uri: `${IMAGE_BASE_URL}${castInfoData.profile_path}`,
                  }}
                  style={styles.image}
                  resizeMode='cover'
                />
              </View>
              <BioData castData={castInfoData} />
              <CombinedCredits castId={castId} />
            </ScrollView>
          </View>
          <BioGraphy castData={castInfoData} />
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  imgContainer: {
    width: DVW(75),
    height: Platform.OS === "ios" ? DVH(35) : DVH(35),
    marginTop: verticalScale(15),
    borderWidth: DVW(0.3),
    alignSelf: "center",
    backgroundColor: colors.gray,
    borderRadius: Math.min(DVW(80), DVH(50)) / 2, // Ensures the container is fully rounded
    overflow: "hidden",
  },
});
