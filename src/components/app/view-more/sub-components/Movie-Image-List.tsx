import { useImageLoader } from "@src/hooks/state";
import { DVH, DVW, layout, moderateScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { memo, useContext } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";

type movieImageListSubCompProps = {
  setIsVisible: () => void;
  index: number;
  item: any;
};

const MovieImageListSubComp: React.FC<movieImageListSubCompProps> = ({
  setIsVisible,
  index,
  item,
}) => {
  const { theme } = useContext(ThemeContext);
  const { imageLoading, handleImageLoadEnd, handleImageLoadStart } =
    useImageLoader();
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setIsVisible()}>
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
              size='large'
              color={
                theme === "dark" ? colors.primaryColor2 : colors.primaryColor
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
  );
};

const styles = StyleSheet.create({
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

export default memo(MovieImageListSubComp);
