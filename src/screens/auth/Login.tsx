import React, { useContext, useEffect } from "react";
import { AuthScreenProps } from "@src/router/Types";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Header } from "@src/components/auth";
import { Screen } from "../Screen";
import { AppButton, AppInput, AppText } from "@src/components/shared";
import { DVH, DVW, layout, verticalScale } from "@src/resources";
import { Entypo } from "@expo/vector-icons";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@src/form/validation";
import { loginFormType } from "@src/form/types";
import { KeyboardDismissal, Loader, ModalMessage } from "@src/components/core";
import { useGoogleSignIn } from "@src/hooks/state";
import * as WebBrowser from "expo-web-browser";
import { useLogin } from "@src/functions/firebase/services";
import { convertInputValueToLowercaseAndRemoveWhiteSpace } from "@src/helper/helper";

WebBrowser.maybeCompleteAuthSession();

export const Login = ({}: AuthScreenProps<"Login">) => {
  const { promptAsync, gLoading } = useGoogleSignIn();
  const { theme } = useContext(ThemeContext);
  const {
    fireStoreLogin,
    loading,
    loginFormErr,
    modalMessage,
    setModalMessage,
  } = useLogin();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<loginFormType>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (loginFormErr.username) {
      setError("username", {
        type: "custom",
        message: "username not found",
      });
    } else {
      clearErrors("username");
    }
  }, [loginFormErr]);

  const onSubmit = async (data: loginFormType) => {
    if (data) {
      await fireStoreLogin({
        username: convertInputValueToLowercaseAndRemoveWhiteSpace(
          data.username
        ),
        password: convertInputValueToLowercaseAndRemoveWhiteSpace(
          data.password
        ),
      });
    }
  };

  return (
    <>
      <Screen>
        <KeyboardDismissal>
          <View>
            <Header
              title='Login'
              rightIcon={
                <Entypo
                  name='key'
                  color={
                    theme === "dark"
                      ? colors.primaryColor
                      : colors.primaryColor2
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
                    error={errors?.username?.message}
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                    onSubmitEditing={() => console.log("Hello, username")}
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
                  backgroundColor: "red",
                }}
                isLoading={loading}
              />
              <AppText style={styles.orText} fontSemibold sizeBody gray>
                Or
              </AppText>

              <TouchableOpacity
                style={styles.googleBtn}
                disabled={gLoading}
                onPress={() => promptAsync()}>
                {gLoading ? (
                  <Loader sizes='small' color={colors.white} />
                ) : (
                  <>
                    <Image
                      source={require("@src/assets/icons/google.png")}
                      resizeMode='center'
                      style={{
                        width: DVW(7),
                        height: DVH(7),
                      }}
                    />
                    <AppText
                      fontRegular
                      sizeBody
                      style={{
                        color: theme === "dark" ? colors.white : colors.white,
                      }}>
                      Sign in With Google
                    </AppText>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardDismissal>
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
        enteringAnimation='BounceInUp'
        exitingAnimation='BounceOutDown'
      />
    </>
  );
};

const styles = StyleSheet.create({
  orText: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    alignSelf: "center",
  },
  googleBtn: {
    backgroundColor: "#4285F4",
    height: DVH(7),
    borderRadius: layout.size10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: DVW(5),
  },
});
