import { AppButton, AppInput, AppText, Header } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";
import React, { useContext, useState } from "react";
import { Screen } from "@src/screens/Screen";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchKeywordType } from "@src/form/types";
import { searchKeywordSchema } from "@src/form/validation";
import { useExtensiveSearch } from "@src/functions/api/services/search";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { DVW, layout, moderateScale, verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "@src/resources/Theme";
import { Loader } from "@src/components/core";
import { Error, NextButton, PrevButton } from "@src/common";
import { SearchXtensiveMoviesComp } from "@src/components/app/search";
import { MovieCard } from "@src/components/card";
import { useMovieCardClick } from "@src/components/core/services";

export const ExtensiveSearch = ({
  navigation,
}: DrawerStackScreenProps<"ExtensiveSearch">) => {
  const { theme } = useContext(ThemeContext);
  const [showSearchMovie, setShowSearchMovies] = useState<boolean>(false);
  const { movieCardClick } = useMovieCardClick();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<searchKeywordType>({
    mode: "onChange",
    resolver: yupResolver(searchKeywordSchema),
  });

  const {
    getXtensiveSearch,
    loading,
    isError,
    queryStringVal,
    setQueryStringVal,
    xtensiveSearchData,
    prevBtn,
    nextBtn,
    pageNumber,
  } = useExtensiveSearch();

  const onSubmit = async (data: searchKeywordType) => {
    if (data) {
      getXtensiveSearch(queryStringVal, false, pageNumber);
    }
  };
  return (
    <>
      <Screen>
        <Header title='Extensive Search' backHeader />
        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              searchInput
              placeholder='search movies, series here'
              label=''
              error={errors?.keyword?.message}
              value={field.value}
              onChangeText={(value) => {
                field.onChange(value);
                setQueryStringVal(value);
              }}
            />
          )}
          name='keyword'
          defaultValue=''
        />
        <AppButton
          title='Search'
          onPress={handleSubmit(onSubmit)}
          rightIcon={
            <FontAwesome
              name='search'
              size={moderateScale(15)}
              color={colors.white}
            />
          }
          isLoading={loading}
        />
        <View style={styles.filterContainer}>
          <AppText fontRegular sizeMedium gray>
            Filter
          </AppText>
          <TouchableOpacity
            onPress={() => setShowSearchMovies(!showSearchMovie)}
            style={[
              styles.filterBtn,
              {
                backgroundColor:
                  theme === "dark" ? colors.primaryColor2 : colors.primaryColor,
              },
            ]}>
            <Ionicons
              name='filter-circle'
              size={moderateScale(20)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <Loader
            sizes='large'
            color={
              theme === "dark" ? colors.primaryColor2 : colors.primaryColor
            }
          />
        ) : isError ? (
          <Error
            errTitle='Error searching movie'
            onRefresh={() => {}}
            refreshBtnTitle='Re-search'
          />
        ) : (
          <FlatList
            data={xtensiveSearchData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingLeft: moderateScale(6),
                }}>
                <MovieCard
                  items={item}
                  index={index}
                  viewMore={() => movieCardClick(item.id, item.media_type)}
                />
              </View>
            )}
            numColumns={2}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            windowSize={2}
            updateCellsBatchingPeriod={100}
          />
        )}
        <View style={styles.slideControlContainer}>
          <PrevButton prevFunc={() => prevBtn()} />
          <NextButton nextFunc={() => nextBtn()} />
        </View>
      </Screen>
      <SearchXtensiveMoviesComp
        visible={showSearchMovie}
        setVisible={() => setShowSearchMovies(!showSearchMovie)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slideControlContainer: {
    flexDirection: "row",
    gap: layout.size10,
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    zIndex: 10,
    bottom: verticalScale(20),
  },
  filterBtn: {
    width: DVW(8),
    paddingVertical: moderateScale(5),
    borderRadius: layout.size50,
    justifyContent: "center",
    alignItems: "center",
  },
});
