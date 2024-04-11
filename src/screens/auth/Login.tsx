import React, { useContext } from "react";
import { AuthScreenProps } from "@src/router/Types";
import { View } from "react-native";
import { Header } from "@src/components/auth";
import { Screen } from "../Screen";
import { AppButton, AppInput } from "@src/components/shared";
import { layout } from "@src/resources";
import { Entypo } from "@expo/vector-icons";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@src/form/validation";
import { loginFormType } from "@src/form/types";

export const Login = ({ navigation }: AuthScreenProps<"Login">) => {
  const { theme } = useContext(ThemeContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormType>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: loginFormType) => {
    console.log(data);
  };

  return (
    <Screen>
      <Header
        onPress={() => navigation.goBack()}
        title='Login'
        rightIcon={
          <Entypo
            name='key'
            color={
              theme === "dark" ? colors.primaryColor : colors.primaryColor2
            }
            size={layout.size18}
          />
        }
      />
      <View>
        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              label='Username or Email'
              placeholder='example@gmail.com'
              error={errors?.userName?.message}
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              onSubmitEditing={() => console.log("Hello, username")}
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
              passwordInput
              error={errors?.password?.message}
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name='password'
          defaultValue=''
        />
        <AppButton
          title='Continue'
          onPress={handleSubmit(onSubmit)}
          style={{
            alignSelf: "center",
            marginTop: layout.size6,
          }}
        />
      </View>
    </Screen>
  );
};
