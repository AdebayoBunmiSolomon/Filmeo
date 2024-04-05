import { layout } from "@src/resources";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

type scrollContainerProps = {
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
};

export const ScrollContainer: React.FC<scrollContainerProps> = ({
  children,
  style,
}) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : undefined}>
      <ScrollView
        style={[styles.scrollView, style]}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    marginBottom: layout.size45,
  },
});
