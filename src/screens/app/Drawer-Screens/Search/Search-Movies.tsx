import React, { useContext, useEffect, useState } from "react";
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
import { includeAdult } from "@src/constant/data";
import { useSearchMovies } from "@src/functions/api/services/search";
import { returnBooleanConstraintsForYesOrNoSelection } from "@src/helper/helper";
import { Loader } from "@src/components/core";
import { MovieCard } from "@src/components/card";

export const SearchMovies = ({
  navigation,
}: DrawerStackScreenProps<"SearchMovies">) => {
  const { theme } = useContext(ThemeContext);
  const {
    searchMovieData,
    loading,
    isError,
    getSearchMovie,
    prevBtn,
    nextBtn,
    pageNumber,
  } = useSearchMovies();
  const [selection, setSelection] = useState<string>(includeAdult[0].name);
  const [queryString, setQueryString] = useState<string>("");
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

  const include_adult = returnBooleanConstraintsForYesOrNoSelection(selection);

  const onSubmit = async (data: searchKeywordType) => {
    getSearchMovie(data.keyword, include_adult, pageNumber);
  };

  useEffect(() => {
    getSearchMovie(queryString, include_adult, pageNumber);
  }, [queryString, include_adult, pageNumber]);

  return (
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
      <View style={styles.selectionContainer}>
        <ListButton
          data={includeAdult}
          setSelectedItem={(value) => setSelection(value)}
          showHeaderTitle
          headerTitle='adult?'
          loading={false}
        />
      </View>
      {loading ? (
        <Loader
          sizes='large'
          color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
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
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: verticalScale(10),
  },
  selectionContainer: {
    flexDirection: "row",
    gap: moderateScale(10),
    justifyContent: "flex-end",
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
