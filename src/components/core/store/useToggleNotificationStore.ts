import { create } from "zustand";

interface IToggleNotificationProps {
  pushToggleOn: boolean;
  setPushToggleOn: (value: boolean) => void;
  isSubscriptionChecked: boolean;
  setIsSubscriptionChecked: (value: boolean) => void;
}

/**
 * a store to hold the toggled boolean value across the app.
 */
export const useToggleNotificationStore = create<IToggleNotificationProps>(
  (set) => ({
    pushToggleOn: false,
    setPushToggleOn: (pushToggleOn) => set({ pushToggleOn: pushToggleOn }),
    isSubscriptionChecked: false,
    setIsSubscriptionChecked: (isSubscriptionChecked) =>
      set({ isSubscriptionChecked: isSubscriptionChecked }),
  })
);
