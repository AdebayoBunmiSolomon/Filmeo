import { IMAGE_BASE_URL } from "@env";
import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetTrendingMovies } from "@src/functions/api/services";
import { DVH, DVW, layout, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { truncateText } from "@src/helper/helper";
import { useImageLoader, useNextPrev } from "@src/hooks/state";

export const TrendingMovies = () => {
  const { theme } = useContext(ThemeContext);
  const { getTrendingMovies, loading, trendingMoviesData } =
    useGetTrendingMovies();
  const { prevBtn, nextBtn, pageNumber } = useNextPrev();
  const { imageLoading, handleImageLoadEnd, handleImageLoadStart } =
    useImageLoader();

  useEffect(() => {
    getTrendingMovies(pageNumber);
  }, [pageNumber]);
  return (
    <View style={styles.container}>
      <AppText
        fontSemibold
        sizeMedium
        gray
        style={{
          marginBottom: layout.size10,
        }}>
        Trending Movies🔥
      </AppText>
      <View>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: layout.size30,
            }}>
            <Loader
              sizes='large'
              color={
                theme === "dark" ? colors.primaryColor2 : colors.primaryColor
              }
            />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <>
              {trendingMoviesData.map((items, index: number) => (
                <View
                  style={{
                    flexDirection: "column",
                  }}
                  key={index}>
                  <View style={styles.imgContainer}>
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
                      source={{ uri: `${IMAGE_BASE_URL}${items.poster_path}` }}
                      resizeMode='cover'
                      style={styles.img}
                      onLoadStart={() => handleImageLoadStart(index)}
                      onLoadEnd={() => handleImageLoadEnd(index)}
                    />
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
                </View>
              ))}
            </>
          </ScrollView>
        )}
      </View>
      <View style={styles.slideControlContainer}>
        <TouchableOpacity
          style={[
            styles.nextBtn,
            {
              backgroundColor: colors.lightGray,
            },
          ]}
          onPress={() => {
            prevBtn();
          }}>
          <Feather
            name='chevron-left'
            color={theme === "dark" ? colors.white : colors.black}
            size={layout.size30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextBtn,
            {
              backgroundColor: colors.lightGray,
            },
          ]}
          onPress={() => {
            nextBtn();
          }}>
          <Feather
            name='chevron-right'
            color={theme === "dark" ? colors.white : colors.black}
            size={layout.size30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: layout.size14,
  },
  img: {
    width: DVW(50),
    height: DVH(30),
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
  nextBtn: {
    paddingHorizontal: layout.size8,
    paddingVertical: layout.size8,
    borderRadius: 50,
  },
  slideControlContainer: {
    flexDirection: "row",
    gap: layout.size10,
    marginTop: verticalScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
});
