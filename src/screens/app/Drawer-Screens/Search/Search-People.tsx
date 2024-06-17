import React from "react";
import { Screen } from "../../../Screen";
import { AppButton, AppInput, Header } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";
import { moderateScale, verticalScale } from "@src/resources";
import { StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@src/resources/Colors";
import { Controller, useForm } from "react-hook-form";
import { searchKeywordType } from "@src/form/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchKeywordSchema } from "@src/form/validation";

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

  const onSubmit = async (data: searchKeywordType) => {
    if (data) {
      console.log("Keyword entered successfully");
    }
  };
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
            onChangeText={field.onChange}
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
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: verticalScale(10),
  },
});
