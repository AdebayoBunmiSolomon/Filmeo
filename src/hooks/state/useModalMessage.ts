import { useState } from "react";

type useModalMessageType = {
  visible: boolean;
  title: string;
  btnTitle: string;
  btnPress: () => void;
  type: "success" | "danger" | "warning" | "info" | undefined;
};

export const useModalMessage = () => {
  const [modalMessage, setModalMessage] = useState<useModalMessageType>({
    visible: false,
    title: "",
    btnTitle: "",
    btnPress: () => {},
    type: undefined,
  });

  return {
    modalMessage,
    setModalMessage,
  };
};
