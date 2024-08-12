import { create } from "zustand";

type useModalMessageType = {
  visible: boolean;
  title: string;
  btnTitle: string;
  btnPress: () => void;
  type: "success" | "danger" | "warning" | "info" | undefined;
};

interface IModalMessageProps {
  modalMessage: useModalMessageType;
  setModalMessage: (value: useModalMessageType) => void;
}

export const useModalMessage = create<IModalMessageProps>((set) => ({
  modalMessage: {
    visible: false,
    title: "",
    btnTitle: "",
    btnPress: () => {},
    type: undefined,
  },
  setModalMessage: (modalMessage) => set({ modalMessage: modalMessage }),
}));
