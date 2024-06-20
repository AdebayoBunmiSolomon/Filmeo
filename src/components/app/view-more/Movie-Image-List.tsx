import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ImageView from "react-native-image-viewing";
import MovieImageListSubComp from "./sub-components/Movie-Image-List";

type movieImageList = {
  movieImageData: any[];
  isError: boolean;
  loading: boolean;
};

export const MovieImageList: React.FC<movieImageList> = ({
  movieImageData,
  isError,
  loading,
}) => {
  const { theme } = useContext(ThemeContext);
  const [visible, setIsVisible] = useState<boolean>(false);

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
          maxToRenderPerBatch={2}
          initialNumToRender={2}
          windowSize={2}
          updateCellsBatchingPeriod={100}
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
