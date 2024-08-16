import { create } from "zustand";

type pushTokenDataType = {
  date_created: string | undefined;
  device_name: string | undefined | null;
  device_type: string | undefined;
  id: string | undefined;
  token: string | undefined;
  subscribed: boolean | undefined;
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
    subscribed: false,
  },
  setPushTokenStore: (pushTokenStore) =>
    set({ pushTokenStore: pushTokenStore }),
}));
