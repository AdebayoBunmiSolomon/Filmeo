import { useIsFocused } from "@react-navigation/native";
import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetMovieImages } from "@src/functions/api/services";
import { useImageLoader } from "@src/hooks/state";
import { DVH, DVW, layout, moderateScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import ImageView from "react-native-image-viewing";

type movieImageList = {
  movieId: number;
};

export const MovieImageList: React.FC<movieImageList> = ({ movieId }) => {
  const { theme } = useContext(ThemeContext);
  const [visible, setIsVisible] = useState<boolean>(false);
  const { getMovieImages, isError, loading, movieImageData } =
    useGetMovieImages();
  console.log(movieImageData);
  const { imageLoading, handleImageLoadEnd, handleImageLoadStart } =
    useImageLoader();
  const isFocused = useIsFocused();

  useEffect(() => {
    getMovieImages(movieId);
  }, [isFocused]);

  return (
    <>
      <AppText fontSemibold sizeMedium black>
        Movie Images
      </AppText>
      {loading ? (
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
          keyExtractor={(item, index) => item.uri.toString() + index}
          renderItem={({ item, index }) => (
            <>
              <TouchableOpacity
                style={styles.container}
                onPress={() => setIsVisible(true)}>
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
                  {imageLoading[index] && (
                    <ActivityIndicator
                      size='large'
                      color={
                        theme === "dark"
                          ? colors.primaryColor2
                          : colors.primaryColor
                      }
                      style={styles.loader}
                    />
                  )}
                  <Image
                    source={{ uri: `${item.uri}` }}
                    resizeMode='cover'
                    style={styles.img}
                    onLoadStart={() => handleImageLoadStart(index)}
                    onLoadEnd={() => handleImageLoadEnd(index)}
                  />
                </View>
              </TouchableOpacity>
            </>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
  container: {
    flexDirection: "column",
    gap: layout.size10,
    width: DVW(50),
    marginRight: moderateScale(-60),
  },
  imgContainer: {
    borderRadius: layout.size16,
    width: DVW(30),
    height: DVH(20),
    overflow: "hidden",
    borderWidth: DVW(0.2),
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  img: {
    width: DVW(30),
    height: DVH(20),
  },
});
