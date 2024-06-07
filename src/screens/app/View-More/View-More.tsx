import { RootStackScreenProps } from "@src/router/Types";
import React, { useContext, useEffect } from "react";
import { Screen } from "@src/screens/Screen";
import { Image, StyleSheet, View } from "react-native";
import { AppText, Header } from "@src/components/shared";
import { useGetMovieDetails } from "@src/functions/api/services";
import { Loader } from "@src/components/core";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Error } from "@src/common";
import { IMAGE_BASE_URL } from "@env";
import { moderateScale } from "@src/resources";

export const ViewMore = ({
  navigation,
  route,
}: RootStackScreenProps<"ViewMore">) => {
  const { theme } = useContext(ThemeContext);
  const { movieId } = route.params;
  const { movieDetails, getMovieDetails, loading, isError } =
    useGetMovieDetails();
  console.log(movieId);
  useEffect(() => {
    getMovieDetails(movieId);
  }, [movieId]);
  return (
    <Screen>
      <View>
        <Header title='View More' backHeader />
        {loading ? (
          <View style={styles.container}>
            <Loader
              sizes='large'
              color={
                theme === "dark" ? colors.primaryColor2 : colors.primaryColor
              }
            />
          </View>
        ) : isError ? (
          <Error
            onRefresh={() => getMovieDetails(movieId)}
            errTitle='Error loading movie detail'
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
            }}>
            <View
              style={{
                borderRadius: moderateScale(20),
                height: "90%",
                overflow: "hidden",
                backgroundColor: "red",
              }}>
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${movieDetails.poster_path}` }}
                resizeMode='cover'
                style={{
                  width: "100%",
                  height: "40%",
                }}
              />
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
