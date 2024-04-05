import { loaderProps } from "@src/types/types";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader: React.FC<loaderProps> = ({ sizes, color }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={sizes} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
