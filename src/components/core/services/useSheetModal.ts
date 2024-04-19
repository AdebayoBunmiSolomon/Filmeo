import { useState } from "react";

export const useSheetModalServices = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return {
    isModalVisible,
    setIsModalVisible,
  };
};
