import React, { useContext, useEffect } from "react";
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
import { ModalMessage, ScrollContainer } from "@src/components/core";
import { registerFlowOneFormType } from "@src/form/types";
import { useSaveUser } from "@src/functions/firebase/services";
import { convertInputValueToLowercaseAndRemoveWhiteSpace } from "@src/helper/helper";

export const RegisterFlowOne = ({}: AuthScreenProps<"RegisterFlowOne">) => {
  const { firstFlow, flowOneFrmErr, loading, setModalMessage, modalMessage } =
    useSaveUser();
  const { theme } = useContext(ThemeContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<registerFlowOneFormType>({
    mode: "onChange",
    resolver: yupResolver(registerFlowOneFormSchema),
  });

  useEffect(() => {
    if (flowOneFrmErr.fullname) {
      setError("fullname", {
        type: "custom",
        message: "fullname is already taken",
      });
    } else {
      clearErrors("fullname");
    }

    if (flowOneFrmErr.email) {
      setError("email", {
        type: "custom",
        message: "email is already taken",
      });
    } else {
      clearErrors("email");
    }

    if (flowOneFrmErr.phone_number) {
      setError("phone_number", {
        type: "custom",
        message: "phone number is already taken",
      });
    } else {
      clearErrors("phone_number");
    }
  }, [flowOneFrmErr]);

  const onSubmit = async (data: registerFlowOneFormType) => {
    await firstFlow({
      email: convertInputValueToLowercaseAndRemoveWhiteSpace(data.email),
      fullname: convertInputValueToLowercaseAndRemoveWhiteSpace(data.fullname),
      phone_number: convertInputValueToLowercaseAndRemoveWhiteSpace(
        data.phone_number
      ),
    });
  };

  return (
    <>
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
                error={errors?.fullname?.message}
              />
            )}
            name='fullname'
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
                error={errors?.phone_number?.message}
                phoneNumberInput
              />
            )}
            name='phone_number'
            defaultValue=''
          />
        </ScrollContainer>
        <AppButton
          title='Next'
          onPress={handleSubmit(onSubmit)}
          style={{
            marginBottom: layout.size10,
          }}
          isLoading={loading}
        />
      </Screen>

      <ModalMessage
        visible={modalMessage.visible}
        setVisible={() =>
          setModalMessage({ ...modalMessage, visible: !modalMessage.visible })
        }
        title={modalMessage.title}
        btnTitle={modalMessage.btnTitle}
        onPress={() => {}}
        type={modalMessage.type}
        enteringAnimation='ZoomIn'
        exitingAnimation='ZoomOut'
      />
    </>
  );
};
