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
  Platform,
} from "react-native";
import { AppButton, AppText } from "../shared";
import { useImageLoader } from "@src/hooks/state";
import { DVH, DVW, layout, moderateScale } from "@src/resources";
import { useLikedMovie } from "@src/functions/hooks/services";
import { Loader } from "../core";
import { LikeButton } from "@src/common";

type movieCardProps = {
  items: any;
  index: number;
  viewMore: () => void;
};

export const MovieCard: React.FC<movieCardProps> = ({
  items,
  index,
  viewMore,
}) => {
  const { imageLoading, handleImageLoadEnd, handleImageLoadStart } =
    useImageLoader();
  const { theme } = useContext(ThemeContext);
  const { likeAMovieToWatchList, likeMovieLoading } = useLikedMovie();

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
              source={
                items.poster_path
                  ? { uri: `${IMAGE_BASE_URL}${items.poster_path}` }
                  : require("@src/assets/images/no-img.png")
              }
              resizeMode={items.poster_path ? "cover" : "center"}
              style={styles.img}
              onLoadStart={() => handleImageLoadStart(index)}
              onLoadEnd={() => handleImageLoadEnd(index)}
            />
            {likeMovieLoading ? (
              <Loader
                sizes='small'
                color={
                  theme === "dark" ? colors.primaryColor2 : colors.primaryColor
                }
              />
            ) : (
              <LikeButton
                id={Number(items.id)}
                onPressLike={() => {
                  likeAMovieToWatchList(
                    Number(items.id),
                    "name" in items ? items.name : items.title,
                    items.poster_path
                  );
                }}
              />
            )}
          </View>
        </View>
        <AppText
          fontRegular
          sizeBody
          black
          style={{
            textAlign: "center",
          }}>
          {truncateText(String("name" in items ? items.name : items.title))}
        </AppText>
        <AppButton
          title='View More'
          onPress={() => {
            viewMore();
          }}
          outline
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: layout.size10,
    marginRight: layout.size2,
    width: Platform.OS === "ios" ? DVW(45) : DVW(46),
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  imgContainer: {
    borderRadius: layout.size16,
    width: Platform.OS === "ios" ? DVW(45) : DVW(46),
    height: DVH(30),
    overflow: "hidden",
    marginRight: layout.size4,
    borderWidth: DVW(0.2),
    borderColor: colors.gray,
  },
  img: {
    width: Platform.OS === "ios" ? DVW(45) : DVW(46),
    height: DVH(30),
  },
  likeButton: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: moderateScale(10),
  },
});
