import { AppInput, Header } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";
import React from "react";
import { Screen } from "@src/screens/Screen";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchKeywordType } from "@src/form/types";
import { searchKeywordSchema } from "@src/form/validation";

export const ExtensiveSearch = ({
  navigation,
}: DrawerStackScreenProps<"ExtensiveSearch">) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<searchKeywordType>({
    mode: "onChange",
    resolver: yupResolver(searchKeywordSchema),
  });

  const onSubmit = async (data: searchKeywordType) => {
    console.log(data);
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
              placeholder='search keyword here'
              label=''
              error={errors?.keyword?.message}
              value={field.value}
              onChangeText={(value) => {
                field.onChange(value);
              }}
            />
          )}
          name='keyword'
          defaultValue=''
        />
      </Screen>
    </>
  );
};
