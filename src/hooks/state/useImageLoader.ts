import { useState } from "react";

export const useImageLoader = () => {
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleImageLoadStart = (index: number) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  const handleImageLoadEnd = (index: number) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [index]: false,
    }));
  };

  return {
    imageLoading,
    handleImageLoadEnd,
    handleImageLoadStart,
  };
};
