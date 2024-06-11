import { useIsFocused } from "@react-navigation/native";
import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetMovieCast } from "@src/functions/api/services/movies";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MovieCastSubComp from "./sub-components/Movie-Cast";

type movieCastProps = {
  movieId: number;
};

export const MovieCast: React.FC<movieCastProps> = ({ movieId }) => {
  const { isError, movieCastLoading, getMovieCast, movieCastData } =
    useGetMovieCast();
  const isFocused = useIsFocused();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getMovieCast(movieId);
  }, [isFocused]);

  return (
    <>
      <AppText fontSemibold sizeMedium black>
        Top Cast
      </AppText>
      {movieCastLoading ? (
        <Loader
          sizes='small'
          color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
        />
      ) : isError ? (
        <View style={styles.errorContainer}>
          <AppText fontRegular sizeSmall gray>
            Error loading movie casts
          </AppText>
        </View>
      ) : (
        <FlatList
          data={movieCastData}
          keyExtractor={(items, index) => items.id + index.toString()}
          renderItem={({ item, index }) => (
            <>
              <MovieCastSubComp item={item} index={index} />
            </>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={10}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
