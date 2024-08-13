import { useToggleNotificationStore } from "../store/useToggleNotificationStore";
/**
 *
 * @returns sets of functions to toggle notification
 * and puts it in a store in useToggleNotificationStore custom hook
 */
export const useTogglePushNotification = () => {
  const { pushToggleOn, setPushToggleOn } = useToggleNotificationStore();

  const togglePushNotification = () => {
    setPushToggleOn(!pushToggleOn);
  };

  return {
    togglePushNotification,
  };
};
