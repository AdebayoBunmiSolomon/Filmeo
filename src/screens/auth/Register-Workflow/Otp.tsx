import { AuthScreenProps } from "@src/router/Types";
import React, { useContext } from "react";
import { Screen } from "@src/screens/Screen";
import { Header } from "@src/components/auth";
import { FontAwesome6 } from "@expo/vector-icons";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { layout, screenHeight, verticalScale } from "@src/resources";
import { AppButton, AppInput } from "@src/components/shared";
import { ScrollContainer } from "@src/components/core";
import { Controller, useForm } from "react-hook-form";
import { otpFormType } from "@src/form/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpInputFormSchema } from "@src/form/validation";
import { View } from "react-native";

export const Otp = ({ navigation, route }: AuthScreenProps<"Otp">) => {
  const { theme } = useContext(ThemeContext);
  const { data } = route.params ?? { data: undefined };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<otpFormType>({
    mode: "onChange",
    resolver: yupResolver(otpInputFormSchema),
  });

  const proceedToNextScreen = () => {
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
        title='OTP (One Time Pin)'
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
      <ScrollContainer style={{ flexGrow: 1 }}>
        <View
          style={{
            width: "98%",
            height: screenHeight - verticalScale(150),
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Controller
            control={control}
            render={({ field }) => (
              <AppInput
                label='Enter OTP'
                placeholder='enter 6 digit code'
                value={field.value}
                onChangeText={(text) => field.onChange(text)}
                error={errors?.otpInput?.message}
              />
            )}
            name='otpInput'
            defaultValue=''
          />
        </View>
      </ScrollContainer>
      <AppButton
        title='Next'
        onPress={handleSubmit(proceedToNextScreen)}
        style={{
          marginBottom: layout.size10,
        }}
      />
    </Screen>
  );
};
