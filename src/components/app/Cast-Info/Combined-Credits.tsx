import { MovieCard } from "@src/components/card";
import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetCombinedMovieCredits } from "@src/functions/api/services/cast";
import { layout, moderateScale, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type combinedCreditsProps = {
  castId: number;
};

export const CombinedCredits: React.FC<combinedCreditsProps> = ({ castId }) => {
  const { theme } = useContext(ThemeContext);
  const navigation: NavigationProp<any> = useNavigation();
  const {
    getCombinedMovieCredits,
    loading,
    isError,
    combinedMovieCreditsData,
  } = useGetCombinedMovieCredits();

  const movieCardClick = (id: number) => {
    navigation.navigate("ViewMore", {
      movieId: id,
    });
  };

  useEffect(() => {
    getCombinedMovieCredits(castId);
  }, []);
  return (
    <>
      <AppText
        fontSemibold
        sizeMedium
        gray
        style={{
          paddingBottom: verticalScale(10),
        }}>
        Filmography
      </AppText>
      <View>
        {isError ? (
          <View
            style={{
              width: "100%",
              paddingVertical: verticalScale(10),
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: moderateScale(5),
            }}>
            <AppText>Error loading combined credits</AppText>
            <TouchableOpacity onPress={() => getCombinedMovieCredits(castId)}>
              <AppText fontBold mainColor>
                Click to refresh
              </AppText>
            </TouchableOpacity>
          </View>
        ) : loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: layout.size30,
            }}>
            <Loader
              sizes='large'
              color={
                theme === "dark" ? colors.primaryColor2 : colors.primaryColor
              }
            />
          </View>
        ) : (
          <FlatList
            data={combinedMovieCreditsData}
            keyExtractor={(items, index) =>
              items.id.toString() + index.toString()
            }
            renderItem={({ item, index }) => (
              <MovieCard
                items={item}
                index={index}
                viewMore={() => movieCardClick(item.id)}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            windowSize={2}
            updateCellsBatchingPeriod={100}
          />
        )}
      </View>
    </>
  );
};
