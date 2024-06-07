import { IMAGE_BASE_URL } from "@env";
import { DVH, DVW, moderateScale } from "@src/resources";
import { likedMovieDataType } from "@src/types/types";
import React, { useContext } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "../shared";
import { colors } from "@src/resources/Colors";
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "@src/resources/Theme";
import { Loader } from "../core";

type watchListProps = {
  items: likedMovieDataType;
  removeItem: () => void;
  loading: boolean;
};

export const WatchListCard: React.FC<watchListProps> = ({
  items,
  removeItem,
  loading,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.lightGray,
        },
      ]}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${items.videoImgUrl}` }}
        resizeMode='center'
        style={styles.img}
      />
      <View style={styles.movieContentContainer}>
        <View
          style={{
            maxWidth: DVW(50),
          }}>
          <AppText fontRegular sizeBody black>
            {items.title}
          </AppText>
        </View>
        <TouchableOpacity onPress={() => removeItem()}>
          <AppText fontBold sizeBody mainColor>
            {loading ? (
              <Loader
                sizes='small'
                color={
                  theme === "dark" ? colors.primaryColor2 : colors.primaryColor
                }
              />
            ) : (
              <AntDesign
                name='delete'
                size={moderateScale(25)}
                color={"crimson"}
              />
            )}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContentContainer: {
    marginLeft: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(20),
    height: DVH(15),
    overflow: "hidden",
  },
  img: {
    height: "100%",
    width: DVW(20),
  },
});
