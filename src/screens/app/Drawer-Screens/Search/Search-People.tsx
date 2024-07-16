import React, { useContext, useEffect, useState } from "react";
import { Screen } from "../../../Screen";
import { AppButton, AppInput, Header } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";
import { layout, moderateScale, verticalScale } from "@src/resources";
import { FlatList, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@src/resources/Colors";
import { Controller, useForm } from "react-hook-form";
import { searchKeywordType } from "@src/form/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchKeywordSchema } from "@src/form/validation";
import { useSearchPeople } from "@src/functions/api/services/search";
import { Loader } from "@src/components/core";
import { ThemeContext } from "@src/resources/Theme";
import { Error, NextButton, PrevButton } from "@src/common";
import { PersonCard } from "@src/components/card/Person-Card";

export const SearchPeople = ({
  navigation,
}: DrawerStackScreenProps<"SearchPeople">) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<searchKeywordType>({
    mode: "onChange",
    resolver: yupResolver(searchKeywordSchema),
  });
  const { searchPeople, nextBtn, prevBtn, loading, isError, peopleData } =
    useSearchPeople();
  const { theme } = useContext(ThemeContext);
  const [queryString, setQueryString] = useState<string>("");

  const navigateToCastInformation = (id: number) => {
    navigation.navigate("CastInformation", {
      castId: id,
    });
  };

  const onSubmit = async (data: searchKeywordType) => {
    if (data) {
      searchPeople(data.keyword);
    }
  };

  useEffect(() => {
    searchPeople(queryString);
  }, [queryString]);
  return (
    <Screen>
      <Header title='Search People' backHeader />
      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            searchInput
            placeholder='search people here'
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
      {loading ? (
        <Loader
          sizes='large'
          color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
        />
      ) : isError ? (
        <Error
          errTitle='Error searching persons'
          onRefresh={() => {
            searchPeople(queryString);
          }}
          refreshBtnTitle='Re-search'
        />
      ) : (
        <FlatList
          data={peopleData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                paddingLeft: moderateScale(6),
              }}>
              <PersonCard
                items={item}
                index={index}
                viewMore={() => {
                  navigateToCastInformation(item.id);
                }}
              />
            </View>
          )}
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
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(20),
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
