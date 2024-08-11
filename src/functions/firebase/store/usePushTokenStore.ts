import { create } from "zustand";

type pushTokenDataType = {
  date_created: string | undefined;
  device_name: string | undefined | null;
  device_type: string | undefined;
  id: string | undefined;
  token: string | undefined;
};

interface IPushTokenProps {
  pushTokenStore: pushTokenDataType;
  setPushTokenStore: (value: pushTokenDataType) => void;
}

export const usePushTokenStore = create<IPushTokenProps>((set) => ({
  pushTokenStore: {
    date_created: "",
    device_name: "",
    device_type: "",
    id: "",
    token: "",
  },
  setPushTokenStore: (pushTokenStore) =>
    set({ pushTokenStore: pushTokenStore }),
}));
