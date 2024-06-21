import { Form, PageModal } from "@src/common";
import { AppButton, AppInput } from "@src/components/shared";
import { DVW } from "@src/resources";
import React from "react";
import { StyleSheet, View } from "react-native";

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
  return (
    <>
      <PageModal visible={visible} setVisible={() => setVisible(!visible)}>
        <View style={styles.container}>
          <Form title='Filter Form'>
            <AppInput
              placeholder='search query value'
              value={searchQueryValue}
              label=''
            />
            <AppInput
              placeholder='Include Adult'
              value={""}
              label=''
              onChangeText={(value: string) => {
                console.log(value);
              }}
              // phoneNumberInput
            />
            <AppInput
              placeholder='Release Year'
              value={""}
              label=''
              numberInput
              // phoneNumberInput
            />
            <AppInput
              placeholder='Region'
              value={""}
              label=''
              // phoneNumberInput
            />
            <AppButton
              title='Continue'
              onPress={() => {
                setVisible(!visible);
              }}
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
