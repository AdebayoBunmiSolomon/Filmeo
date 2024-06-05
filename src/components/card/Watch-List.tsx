import { IMAGE_BASE_URL } from "@env";
import { DVH, DVW, moderateScale } from "@src/resources";
import { likedMovieDataType } from "@src/types/types";
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "../shared";
import { colors } from "@src/resources/Colors";
import { useWatchList } from "@src/functions/hooks/services";

type watchListProps = {
  items: likedMovieDataType;
};

export const WatchListCard: React.FC<watchListProps> = ({ items }) => {
  const { removeFromWatchList, loading } = useWatchList();
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
      <AppText
        fontRegular
        sizeBody
        black
        style={{
          maxWidth: DVW(80),
        }}>
        {items.title}
      </AppText>
      <TouchableOpacity
        onPress={async () => await removeFromWatchList(Number(items.id))}>
        <AppText fontBold sizeBody mainColor>
          {loading ? (
            <AppText fontBold sizeBody mainColor>
              Loading....
            </AppText>
          ) : (
            <AppText fontBold sizeBody mainColor>
              Delete
            </AppText>
          )}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
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
