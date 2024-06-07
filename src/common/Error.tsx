import { AppButton, AppText } from "@src/components/shared";
import { moderateScale } from "@src/resources";
import React from "react";
import { StyleSheet, View } from "react-native";

type errorProps = {
  errTitle?: string;
  onRefresh: () => void;
  refreshBtnTitle?: string;
};

export const Error: React.FC<errorProps> = ({
  errTitle,
  onRefresh,
  refreshBtnTitle,
}) => {
  return (
    <View style={styles.container}>
      <AppText fontRegular sizeBody gray>
        {errTitle ? errTitle : "Error loading information from server"}
      </AppText>
      <AppButton
        title={refreshBtnTitle ? refreshBtnTitle : "Refresh ♻"}
        onPress={() => onRefresh()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: moderateScale(20),
  },
});
