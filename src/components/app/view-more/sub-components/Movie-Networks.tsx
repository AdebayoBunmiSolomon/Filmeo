import { IMAGE_BASE_URL } from "@env";
import { AppText } from "@src/components/shared";
import { truncateText } from "@src/helper/helper";
import { useImageLoader } from "@src/hooks/state";
import { DVH, DVW, layout, moderateScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type movieNetworkProps = {
  imgData: any[];
};

export const MovieNetworks: React.FC<movieNetworkProps> = ({ imgData }) => {
  const { imageLoading, handleImageLoadEnd, handleImageLoadStart } =
    useImageLoader();
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <AppText fontSemibold sizeMedium black>
        Movie Networks
      </AppText>
      <FlatList
        data={imgData}
        keyExtractor={(items, index) => items.id + index.toString()}
        renderItem={({ item, index }) => (
          <>
            <View style={styles.container}>
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
                    size='small'
                    color={
                      theme === "dark"
                        ? colors.primaryColor2
                        : colors.primaryColor
                    }
                    style={styles.loader}
                  />
                )}
                <Image
                  source={{ uri: `${IMAGE_BASE_URL}${item.logo_path}` }}
                  resizeMode='center'
                  style={styles.img}
                  onLoadStart={() => handleImageLoadStart(index)}
                  onLoadEnd={() => handleImageLoadEnd(index)}
                />
              </View>
              <AppText fontSemibold sizeSmall mainColor>
                {truncateText(item.name)}
              </AppText>
            </View>
          </>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={2}
        initialNumToRender={2}
        windowSize={2}
        updateCellsBatchingPeriod={100}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: layout.size10,
    width: DVW(50),
    overflow: "hidden",
    alignItems: "center",
    marginLeft: DVW(-15),
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
