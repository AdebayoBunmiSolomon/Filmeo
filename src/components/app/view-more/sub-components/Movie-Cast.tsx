import { AppText } from "@src/components/shared";
import { useGetCharacterOfAMovie } from "@src/functions/api/services/cast";
import { truncateText } from "@src/helper/helper";
import { useImageLoader } from "@src/hooks/state";
import { DVH, DVW, layout, moderateScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { memo, useContext, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type movieCastSubCompProps = {
  index: number;
  item: any;
  onPress: () => void;
};

const MovieCastSubComp: React.FC<movieCastSubCompProps> = ({
  index,
  item,
  onPress,
}) => {
  const { theme } = useContext(ThemeContext);
  const { imageLoading, handleImageLoadEnd, handleImageLoadStart } =
    useImageLoader();
  const { getCharacterOfAMovie } = useGetCharacterOfAMovie();

  useEffect(() => {
    getCharacterOfAMovie(item.id);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.imgContainer,
            {
              borderColor:
                theme === "dark" ? colors.primaryColor2 : colors.primaryColor,
            },
          ]}>
          {imageLoading[index] && (
            <ActivityIndicator
              size='small'
              color={
                theme === "dark" ? colors.primaryColor2 : colors.primaryColor
              }
              style={styles.loader}
            />
          )}
          <Image
            source={
              item.uri
                ? { uri: `${item.uri}` }
                : require("@src/assets/images/no-img.png")
            }
            resizeMode={item.uri ? "stretch" : "center"}
            style={styles.img}
            onLoadStart={() => handleImageLoadStart(index)}
            onLoadEnd={() => handleImageLoadEnd(index)}
          />
        </View>
        <TouchableOpacity
          style={styles.nameTextContainer}
          onPress={() => onPress()}>
          <AppText fontSemibold sizeSmall mainColor>
            {truncateText(item.name)}
          </AppText>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: layout.size10,
    width: DVW(50),
    marginRight: moderateScale(-60),
    overflow: "hidden",
  },
  imgContainer: {
    borderRadius: 50,
    width: DVW(20),
    height: DVH(10),
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
    width: DVW(20),
    height: DVH(10),
  },
  nameTextContainer: {
    alignContent: "center",
  },
});

export default memo(MovieCastSubComp);
