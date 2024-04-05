import { Header } from "@src/components/auth";
import { ScrollContainer } from "@src/components/core";
import { AppButton, AppInput } from "@src/components/shared";
import { AuthScreenProps } from "@src/router/Types";
import { Screen } from "@src/screens/Screen";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useContext } from "react";
import { ThemeContext } from "@src/resources/Theme";
import { layout } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFlowTwoFormSchema } from "@src/form/validation";
import {
  createUser,
  registerFlowOneFormType,
  registerFlowTwoFormType,
} from "@src/form/types";
import { registerFlowTwoFormLookUp } from "@src/form/lookup";

export const RegisterFlowTwo = ({
  navigation,
  route,
}: AuthScreenProps<"RegisterFlowTwo">) => {
  const { theme } = useContext(ThemeContext);
  const { data }: any = route.params ?? { data: undefined };
  const flowOneData = data && data;
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<registerFlowTwoFormLookUp>({
    mode: "onChange",
    resolver: yupResolver(registerFlowTwoFormSchema),
  });

  const onSubmit = (data: registerFlowTwoFormLookUp) => {
    const formData: registerFlowTwoFormType = {
      userName: data.userName,
      password: data.password,
    };
    if (data.confirmPassword !== formData.password) {
      setError("confirmPassword", {
        type: "custom",
        message: "Confirm password and password not match",
      });
    } else {
      const createUserData: createUser = {
        fullName: flowOneData.fullName,
        email: flowOneData.email,
        phoneNumber: flowOneData.phoneNumber,
        userName: formData.userName,
        password: formData.password,
      };
      console.log(createUserData);
    }
  };

  return (
    <Screen>
      <Header
        onPress={() => navigation.goBack()}
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
              label='Username'
              placeholder='johndoe12345'
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              error={errors?.userName?.message}
            />
          )}
          name='userName'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              label='Password'
              placeholder='********'
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              passwordInput
              error={errors?.password?.message}
            />
          )}
          name='password'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              label='Confirm Password'
              placeholder='********'
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              passwordInput
              error={errors?.confirmPassword?.message}
            />
          )}
          name='confirmPassword'
          defaultValue=''
        />
      </ScrollContainer>
      <AppButton
        title='Submit'
        onPress={handleSubmit(onSubmit)}
        style={{
          marginBottom: layout.size10,
        }}
      />
    </Screen>
  );
};
