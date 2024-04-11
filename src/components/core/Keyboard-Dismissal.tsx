import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

type keyboardDismissalProps = {
  children: React.ReactNode;
};

export const KeyboardDismissal: React.FC<keyboardDismissalProps> = ({
  children,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={{
        flex: 1,
      }}>
      {children && children}
    </TouchableWithoutFeedback>
  );
};
