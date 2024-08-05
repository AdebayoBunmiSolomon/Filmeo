import { yupResolver } from "@hookform/resolvers/yup";
import { Form, PageModal } from "@src/common";
import { AppButton, AppInput } from "@src/components/shared";
import { xtensiveSearchMovieCompFormType } from "@src/form/types";
import { xTensiveSearchMovieCompFormSchema } from "@src/form/validation";
import { DVW } from "@src/resources";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AdultSelection } from "./Adult-Selection";
import { useMultiSearchMovie } from "@src/functions/api/services/movies";

type searchXtensiveMoviesCompProps = {
  visible: boolean;
  setVisible: (value: React.SetStateAction<boolean>) => void;
};

export const SearchXtensiveMoviesComp: React.FC<
  searchXtensiveMoviesCompProps
> = ({ visible, setVisible }) => {
  const [showAdultSel, setShowAdultSel] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const { multiSearchMovie, loading } = useMultiSearchMovie();
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<xtensiveSearchMovieCompFormType>({
    mode: "onChange",
    resolver: yupResolver(xTensiveSearchMovieCompFormSchema),
  });

  const onSubmit = (data: xtensiveSearchMovieCompFormType) => {
    if (data) {
      // console.log(data);
      multiSearchMovie(data.movieTitle, data.includeAdult, 1);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setValue("includeAdult", selectedItem);
      clearErrors("includeAdult");
    }
  }, [selectedItem]);

  return (
    <>
      <PageModal visible={visible} setVisible={() => setVisible(!visible)}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              <AppButton
                title='Continue'
                onPress={handleSubmit(onSubmit)}
                style={{
                  width: DVW(80),
                }}
                isLoading={loading}
              />
            </Form>
          </View>
        </TouchableWithoutFeedback>
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
