import { useIsFocused } from "@react-navigation/native";
import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetMovieImages } from "@src/functions/api/services/movies";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ImageView from "react-native-image-viewing";
import MovieImageListSubComp from "./sub-components/Movie-Image-List";

type movieImageList = {
  movieId: number;
};

export const MovieImageList: React.FC<movieImageList> = ({ movieId }) => {
  const { theme } = useContext(ThemeContext);
  const [visible, setIsVisible] = useState<boolean>(false);
  const { getMovieImages, isError, movieImageLoading, movieImageData } =
    useGetMovieImages();
  const isFocused = useIsFocused();

  useEffect(() => {
    getMovieImages(movieId);
  }, [isFocused]);

  return (
    <>
      <AppText fontSemibold sizeMedium black>
        Movie Images
      </AppText>
      {movieImageLoading ? (
        <Loader
          sizes='small'
          color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
        />
      ) : isError ? (
        <View style={styles.errorContainer}>
          <AppText fontRegular sizeSmall gray>
            Error loading movie images
          </AppText>
        </View>
      ) : (
        <FlatList
          data={movieImageData}
          keyExtractor={(item, index) => item.uri + index.toString()}
          renderItem={({ item, index }) => (
            <>
              <MovieImageListSubComp
                setIsVisible={() => setIsVisible(true)}
                item={item}
                index={index}
              />
            </>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={10}
        />
      )}
      <ImageView
        images={movieImageData}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
