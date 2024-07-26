import React, { useContext } from "react";
import { AuthScreenProps } from "@src/router/Types";
import { Screen } from "@src/screens/Screen";
import { Header } from "@src/components/auth";
import { FontAwesome6 } from "@expo/vector-icons";
import { layout } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFlowOneFormSchema } from "@src/form/validation";
import { AppButton, AppInput } from "@src/components/shared";
import { ScrollContainer } from "@src/components/core";
import { registerFlowOneFormType } from "@src/form/types";

export const RegisterFlowOne = ({
  navigation,
}: AuthScreenProps<"RegisterFlowOne">) => {
  const { theme } = useContext(ThemeContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFlowOneFormType>({
    mode: "onChange",
    resolver: yupResolver(registerFlowOneFormSchema),
  });

  const onSubmit = (data: registerFlowOneFormType) => {
    //this holds the data to be submitted without the confirm-password
    // if data not empty, navigate with data
    if (data.email && data.fullName && data.phoneNumber) {
      navigation.navigate("RegisterFlowTwo", {
        data: {
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
        },
      });
    }
  };

  return (
    <Screen>
      <Header
        title='Register'
        rightIcon={
          <FontAwesome6
            name='user-pen'
            color={
              theme === "dark" ? colors.primaryColor : colors.primaryColor2
            }
            size={layout.size18}
          />
        }
      />
      <ScrollContainer style={{ flex: 1 }}>
        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              label='Full Name'
              placeholder='John Doe'
              value={field.value}
              onChangeText={(text) => {
                field.onChange(text);
              }}
              error={errors?.fullName?.message}
            />
          )}
          name='fullName'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              label='Email'
              placeholder='JohnDoe@gmail.com'
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              error={errors?.email?.message}
            />
          )}
          name='email'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              label='Phone Number'
              placeholder='80 000 0000'
              value={field.value}
              onChangeText={(text) => {
                field.onChange(text);
              }}
              error={errors?.phoneNumber?.message}
              phoneNumberInput
            />
          )}
          name='phoneNumber'
          defaultValue=''
        />
      </ScrollContainer>
      <AppButton
        title='Next'
        onPress={handleSubmit(onSubmit)}
        style={{
          marginBottom: layout.size10,
        }}
      />
    </Screen>
  );
};
