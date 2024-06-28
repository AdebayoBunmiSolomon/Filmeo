import { yupResolver } from "@hookform/resolvers/yup";
import { Form, PageModal } from "@src/common";
import { AppButton, AppInput } from "@src/components/shared";
import { searchMovieCompFormType } from "@src/form/types";
import { searchMovieCompFormSchema } from "@src/form/validation";
import { DVW } from "@src/resources";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { AdultSelection } from "./Adult-Selection";
import { RegionSelection } from "./Region-Selection";

type searchMoviesCompProps = {
  visible: boolean;
  setVisible: (value: React.SetStateAction<boolean>) => void;
  searchQueryValue: string;
};

export const SearchMoviesComp: React.FC<searchMoviesCompProps> = ({
  visible,
  setVisible,
  searchQueryValue,
}) => {
  const [showAdultSel, setShowAdultSel] = useState<boolean>(false);
  const [showRegionSel, setShowRegionSel] = useState<boolean>(false);
  const [selectedRegionItem, setSelectedRegionItem] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<searchMovieCompFormType>({
    mode: "onChange",
    resolver: yupResolver(searchMovieCompFormSchema),
  });

  const onSubmit = (data: searchMovieCompFormType) => {
    if (data) {
      console.log(data);
    }
  };

  useEffect(() => {
    if (searchQueryValue) {
      setValue("movieTitle", searchQueryValue);
      clearErrors("movieTitle");
    }
  }, [searchQueryValue]);

  useEffect(() => {
    if (selectedItem) {
      setValue("includeAdult", selectedItem);
      clearErrors("includeAdult");
    }
  }, [selectedItem]);

  useEffect(() => {
    if (selectedRegionItem) {
      setValue("region", selectedRegionItem);
      clearErrors("region");
    }
  }, [selectedRegionItem]);

  return (
    <>
      <PageModal visible={visible} setVisible={() => setVisible(!visible)}>
        <View style={styles.container}>
          <Form title='Filter Form'>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  placeholder='movie title'
                  value={field.value}
                  label=''
                  onChangeText={(value) => {
                    field.onChange(value);
                  }}
                  error={errors?.movieTitle?.message}
                  editable={false}
                  selectTextOnFocus={false}
                />
              )}
              name='movieTitle'
              defaultValue=''
            />
            <Controller
              control={control}
              render={({ field }) => (
                <>
                  <AppInput
                    placeholder='include adult'
                    value={field.value}
                    label=''
                    onChangeText={(value) => {
                      field.onChange(value);
                    }}
                    error={errors?.includeAdult?.message}
                    dropDown
                    onPressDropDown={() => setShowAdultSel(!showAdultSel)}
                    inputStyle={{
                      width: DVW(81),
                    }}
                  />
                  <AdultSelection
                    showSelection={showAdultSel}
                    setSelectedItem={(value) => setSelectedItem(value)}
                    setShowSelection={(value) => setShowAdultSel(value)}
                  />
                </>
              )}
              name='includeAdult'
              defaultValue=''
            />
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  placeholder='release year'
                  value={field.value}
                  label=''
                  numberInput
                  onChangeText={(value) => field.onChange(value)}
                  error={errors?.releaseYear?.message}
                />
              )}
              name='releaseYear'
              defaultValue=''
            />
            <Controller
              control={control}
              render={({ field }) => (
                <>
                  <AppInput
                    placeholder='region'
                    value={field.value}
                    label=''
                    onChangeText={(value) => field.onChange(value)}
                    error={errors?.region?.message}
                    dropDown
                    onPressDropDown={() => setShowRegionSel(!showRegionSel)}
                    inputStyle={{
                      width: DVW(81),
                    }}
                  />
                  <RegionSelection
                    showSelection={showRegionSel}
                    setShowSelection={(value) => setShowRegionSel(value)}
                    setSelectedItem={(values) => setSelectedRegionItem(values)}
                  />
                </>
              )}
              name='region'
              defaultValue=''
            />
            <AppButton
              title='Continue'
              onPress={handleSubmit(onSubmit)}
              style={{
                width: DVW(80),
              }}
            />
          </Form>
        </View>
      </PageModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
