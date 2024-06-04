import { IMAGE_BASE_URL } from "@env";
import { truncateText } from "@src/helper/helper";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import {
  ActivityIndicator,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AppButton, AppText } from "../shared";
import { useImageLoader } from "@src/hooks/state";
import { DVH, DVW, layout, moderateScale } from "@src/resources";
import { AntDesign } from "@expo/vector-icons";
import { useLikedMovie } from "@src/functions/hooks/services";

type movieCardProps = {
  items: any;
  index: number;
};

export const MovieCard: React.FC<movieCardProps> = ({ items, index }) => {
  const { imageLoading, handleImageLoadEnd, handleImageLoadStart } =
    useImageLoader();
  const { theme } = useContext(ThemeContext);
  const { likedMovie, likeAMovie } = useLikedMovie();

  const likeButton = (id: number) => {
    const isMovieLiked = likedMovie.some((movies) => movies.id === id);
    return (
      <AntDesign
        name={`${isMovieLiked ? "heart" : "hearto"}`}
        size={layout.size26}
        color={colors.white}
      />
    );
  };

  return (
    <>
      <View style={styles.container} key={index}>
        <View style={styles.imgContainer}>
          {imageLoading[index] && (
            <ActivityIndicator
              size='large'
              color={
                theme === "dark" ? colors.primaryColor2 : colors.primaryColor
              }
              style={styles.loader}
            />
          )}
          <View>
            <Image
              source={{ uri: `${IMAGE_BASE_URL}${items.poster_path}` }}
              resizeMode='cover'
              style={styles.img}
              onLoadStart={() => handleImageLoadStart(index)}
              onLoadEnd={() => handleImageLoadEnd(index)}
            />
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => {
                likeAMovie(Number(items.id), items.title, items.poster_path);
              }}>
              {likeButton(Number(items.id))}
            </TouchableOpacity>
          </View>
        </View>
        <AppText
          fontRegular
          sizeBody
          black
          style={{
            textAlign: "center",
          }}>
          {truncateText(String(items.title))}
        </AppText>
        <AppButton title='View More' onPress={() => {}} outline />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: layout.size10,
    marginRight: layout.size10,
    width: DVW(50),
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  imgContainer: {
    borderRadius: layout.size16,
    width: DVW(50),
    height: DVH(30),
    overflow: "hidden",
    marginRight: layout.size10,
    borderWidth: DVW(0.2),
    borderColor: colors.gray,
  },
  img: {
    width: DVW(50),
    height: DVH(30),
  },
  likeButton: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: moderateScale(10),
  },
});
