import { Header } from "@src/components/auth";
import { ModalMessage, ScrollContainer } from "@src/components/core";
import { AppButton, AppInput, AppText } from "@src/components/shared";
import { AuthScreenProps } from "@src/router/Types";
import { Screen } from "@src/screens/Screen";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "@src/resources/Theme";
import { DVH, DVW, layout } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFlowTwoFormSchema } from "@src/form/validation";
import { createUser } from "@src/form/types";
import { registerFlowTwoFormLookUp } from "@src/form/lookup";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { RegisterSheetModal } from "@src/components/auth/Register/Sheet-Modal";
import { useSheetModalServices } from "@src/components/core/services";
import { useImageStore } from "@src/components/core/store";
import {
  convertInputValueToLowercaseAndRemoveWhiteSpace,
  getCurrentDate,
} from "@src/helper/helper";
import { useSaveUser } from "@src/functions/firebase/services";
import { StackActions } from "@react-navigation/native";

export const RegisterFlowTwo = ({
  navigation,
  route,
}: AuthScreenProps<"RegisterFlowTwo">) => {
  const { theme } = useContext(ThemeContext);
  const { data } = route.params ?? { data: undefined };
  const { isModalVisible, setIsModalVisible } = useSheetModalServices();
  const { capturedImage } = useImageStore();
  const flowOneData = data && data;
  const { secondFlow, flowTwoFrmErr, loading, modalMessage, setModalMessage } =
    useSaveUser();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm<registerFlowTwoFormLookUp>({
    mode: "onChange",
    resolver: yupResolver(registerFlowTwoFormSchema),
  });

  useEffect(() => {
    if (flowTwoFrmErr.username) {
      setError("username", {
        type: "custom",
        message: "username is already taken",
      });
    } else {
      clearErrors("username");
    }
  }, [flowTwoFrmErr]);

  useEffect(() => {
    if (capturedImage) {
      setValue("image", capturedImage);
    }
  }, [capturedImage]);

  const onSubmit = async (data: registerFlowTwoFormLookUp) => {
    const createUserData: createUser = {
      fullname: convertInputValueToLowercaseAndRemoveWhiteSpace(
        flowOneData.fullName
      ),
      email: convertInputValueToLowercaseAndRemoveWhiteSpace(flowOneData.email),
      phone_number: convertInputValueToLowercaseAndRemoveWhiteSpace(
        flowOneData.phoneNumber
      ),
      username: convertInputValueToLowercaseAndRemoveWhiteSpace(data.username),
      password: convertInputValueToLowercaseAndRemoveWhiteSpace(data.password),
      avatar_url: "",
      created_at: getCurrentDate(),
      updated_at: getCurrentDate(),
    };
    await secondFlow(createUserData);
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
            render={({}) => {
              return !capturedImage ? (
                <View
                  style={[
                    styles.selectImgContainer,
                    { borderWidth: DVW(0.3), borderColor: colors.gray },
                  ]}>
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(!isModalVisible)}>
                    <Entypo
                      name='images'
                      size={layout.size22}
                      color={colors.gray}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={[
                    styles.selectImgContainer,
                    { borderWidth: DVW(0.3), borderColor: colors.gray },
                  ]}>
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(!isModalVisible)}
                    style={{ width: "100%", height: "100%" }}>
                    <Image
                      source={{ uri: capturedImage }}
                      resizeMode='cover'
                      style={styles.image}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            name='image'
            defaultValue=''
          />
          {errors?.image && (
            <AppText
              fontRegular
              sizeSmall
              red
              style={{
                alignSelf: "center",
              }}>
              {errors?.image?.message}
            </AppText>
          )}
          <Controller
            control={control}
            render={({ field }) => (
              <AppInput
                label='Username'
                placeholder='johndoe12345'
                value={field.value}
                onChangeText={(text) => field.onChange(text)}
                error={errors?.username?.message}
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
        onPress={() => navigation.dispatch(StackActions.replace("Login", {}))}
        type={modalMessage.type}
        enteringAnimation='SlideInDown'
        exitingAnimation='SlideOutDown'
      />
      <RegisterSheetModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  selectImgContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: DVW(20),
    height: DVH(10),
    alignSelf: "center",
    borderRadius: layout.size50,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: layout.size50,
  },
});
