import React, { useContext, useState } from "react";
import { Screen } from "../../../Screen";
import { DrawerStackScreenProps } from "@src/router/Types";
import { AppButton, AppInput, Header } from "@src/components/shared";
import { FlatList, StyleSheet, View } from "react-native";
import { layout, moderateScale, verticalScale } from "@src/resources";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Controller, useForm } from "react-hook-form";
import { searchKeywordType } from "@src/form/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchKeywordSchema } from "@src/form/validation";
import { Error, ListButton, NextButton, PrevButton } from "@src/common";
import { searchFilterButton } from "@src/constant/data";
import { useSearchMovies } from "@src/functions/api/services/search";
import { Loader } from "@src/components/core";
import { MovieCard } from "@src/components/card";
import { SearchMoviesComp } from "@src/components/app/search";

export const SearchMovies = ({
  navigation,
}: DrawerStackScreenProps<"SearchMovies">) => {
  const { theme } = useContext(ThemeContext);
  const [showSearchMovie, setShowSearchMovies] = useState<boolean>(false);
  const {
    searchMovieData,
    loading,
    isError,
    getSearchMovie,
    prevBtn,
    nextBtn,
    pageNumber,
    setQueryString,
    queryString,
    include_adult,
  } = useSearchMovies();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<searchKeywordType>({
    mode: "onChange",
    resolver: yupResolver(searchKeywordSchema),
  });

  const movieCardClick = (id: number) => {
    navigation.navigate("ViewMore", {
      movieId: id,
    });
  };

  const onSubmit = async (data: searchKeywordType) => {
    getSearchMovie(data.keyword, include_adult, pageNumber);
  };

  return (
    <>
      <Screen>
        <View style={styles.header}>
          <Header title='Search Movies' backHeader />
        </View>
        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              searchInput
              placeholder='search keyword here'
              label=''
              error={errors?.keyword?.message}
              value={field.value}
              onChangeText={(value) => {
                field.onChange(value);
                setQueryString(value);
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
        <ListButton
          data={searchFilterButton}
          setSelectedItem={() => setShowSearchMovies(!showSearchMovie)}
          showHeaderTitle
          headerTitle='Search Filter'
          loading={false}
        />
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
            data={searchMovieData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingLeft: moderateScale(6),
                }}>
                <MovieCard
                  items={item}
                  index={index}
                  viewMore={() => movieCardClick(item.id)}
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
      <SearchMoviesComp
        visible={showSearchMovie}
        setVisible={() => setShowSearchMovies(!showSearchMovie)}
        searchQueryValue={queryString}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: verticalScale(10),
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
});
