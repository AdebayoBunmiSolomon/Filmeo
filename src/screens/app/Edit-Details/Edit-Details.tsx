import { yupResolver } from "@hookform/resolvers/yup";
import { ModalMessage, ScrollContainer } from "@src/components/core";
import { AppButton, AppInput, Header } from "@src/components/shared";
import { editDetailsFormType } from "@src/form/types";
import { editDetailsFormSchema } from "@src/form/validation";
import { useEditUserDetails } from "@src/functions/firebase/services";
import { useAuthentication } from "@src/functions/hooks/services";
import { useModalMessage, useUserDataStore } from "@src/hooks/store";
import { layout, verticalScale } from "@src/resources";
import { RootStackScreenProps } from "@src/router/Types";
import { Screen } from "@src/screens/Screen";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const EditDetails = ({}: RootStackScreenProps<"EditDetails">) => {
  const { modalMessage, setModalMessage } = useModalMessage();
  const { logOut } = useAuthentication();
  const { editUserDetails, editLoading } = useEditUserDetails();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<editDetailsFormType>({
    mode: "onChange",
    resolver: yupResolver(editDetailsFormSchema),
  });
  const { userData } = useUserDataStore();

  const onSubmit = async (data: editDetailsFormType) => {
    if (data) {
      await editUserDetails(data);
    }
  };

  return (
    <>
      <Screen>
        <Header backHeader={true} title='Edit Details' />
        <ScrollContainer style={{ flex: 1, marginTop: verticalScale(10) }}>
          <Controller
            control={control}
            render={({ field }) => (
              <AppInput
                label='Fullname'
                placeholder={`${userData.fullname}`}
                error={errors?.fullname?.message}
                value={field.value}
                onChangeText={(text) => field.onChange(text)}
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
                placeholder={`${userData.email}`}
                error={errors?.email?.message}
                value={field.value}
                onChangeText={(text) => field.onChange(text)}
              />
            )}
            name='email'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <AppInput
                label='Username'
                placeholder={`${userData.username}`}
                error={errors?.username?.message}
                value={field.value}
                onChangeText={(text) => field.onChange(text)}
              />
            )}
            name='username'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <AppInput
                label='Password'
                placeholder={`${userData.password}`}
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
                label='Phone Number'
                placeholder={`${userData.phone_number}`}
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
          title='Update'
          onPress={handleSubmit(onSubmit)}
          style={{
            marginBottom: layout.size10,
          }}
          isLoading={editLoading}
        />
      </Screen>
      <ModalMessage
        visible={modalMessage.visible}
        setVisible={() =>
          setModalMessage({ ...modalMessage, visible: !modalMessage.visible })
        }
        title={modalMessage.title}
        btnTitle={modalMessage.btnTitle}
        onPress={async () => await logOut()}
        type={modalMessage.type}
        enteringAnimation='SlideInDown'
        exitingAnimation='SlideOutDown'
      />
    </>
  );
};
