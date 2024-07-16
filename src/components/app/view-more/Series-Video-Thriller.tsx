import React, { useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DVH, DVW, moderateScale, verticalScale } from "@src/resources";
import YoutubePlayer from "react-native-youtube-iframe";
import { PageModal } from "@src/common";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { useFetchMovieThriller } from "@src/functions/api/services/movies";
import { Loader } from "@src/components/core";
import { useImageLoader } from "@src/hooks/state";

type seriesVideoThrillerProps = {
  videoKey: any[];
};

export const SeriesVideoThriller: React.FC<seriesVideoThrillerProps> = ({
  videoKey,
}) => {
  const { theme } = useContext(ThemeContext);
  const { thrillerLoading, fetchMovieThriller, visible, setVisible } =
    useFetchMovieThriller();
  const { imageLoading, handleImageLoadEnd, handleImageLoadStart } =
    useImageLoader();

  return (
    <>
      <TouchableOpacity
        style={[
          styles.youtubeBtn,
          {
            backgroundColor: colors.danger,
            borderColor: theme === "dark" ? colors.white : colors.gray,
          },
        ]}
        onPress={() => {
          fetchMovieThriller(videoKey);
        }}>
        <FontAwesome6
          name='play-circle'
          size={moderateScale(30)}
          color={theme === "dark" ? colors.gray : colors.white}
        />
      </TouchableOpacity>
      {thrillerLoading ? (
        <View style={styles.loaderContainer}>
          <View
            style={[
              styles.loaderBackground,
              {
                backgroundColor: theme === "dark" ? colors.black : colors.white,
              },
            ]}>
            <Loader
              sizes='large'
              color={
                theme === "dark" ? colors.primaryColor2 : colors.primaryColor
              }
            />
          </View>
        </View>
      ) : (
        <PageModal visible={visible} setVisible={setVisible}>
          <View style={styles.modalContent}>
            <FlatList
              data={videoKey}
              keyExtractor={(item, index) => `${item.key}-${index}`}
              renderItem={({ item, index }) => (
                <>
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
                  <YoutubePlayer
                    height={220}
                    width={DVW(95)}
                    play={false}
                    videoId={item.key}
                    onReady={() => handleImageLoadStart(index)}
                    onError={() => handleImageLoadEnd(index)}
                  />
                </>
              )}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
        </PageModal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  youtubeBtn: {
    width: DVW(18),
    height: DVH(9),
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: verticalScale(100),
    right: moderateScale(10),
    borderWidth: DVW(0.5),
  },
  loaderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 20,
  },
  loaderBackground: {
    width: DVW(20),
    height: DVH(10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(20),
  },
  modalContent: {
    width: "100%",
    height: "90%",
    paddingVertical: moderateScale(10),
  },
  flatListContent: {
    paddingVertical: moderateScale(10),
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
});
