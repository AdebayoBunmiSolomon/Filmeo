import { useState } from "react";

export const useFetchMovieThriller = () => {
  const [thrillerLoading, setThrillerLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const fetchUrl = "https://www.youtube.com/watch?v=";

  const fetchMovieThriller = async (videoKey: any[]) => {
    setThrillerLoading(true);
    setVisible(false);
    try {
      const videoKeyItems = videoKey && videoKey.map((items) => items.key);
      const response = await fetch(`${fetchUrl}${videoKeyItems}`);
      setThrillerLoading(true);
      setVisible(false);
      if (response.ok === true) {
        setThrillerLoading(false);
        setVisible(true);
      } else {
        console.log("Error loading movie thriller video");
        setThrillerLoading(true);
        setVisible(false);
      }
    } catch (err: any) {
      console.log("Error", err);
      setThrillerLoading(false);
      setVisible(false);
    }
  };

  return {
    fetchMovieThriller,
    thrillerLoading,
    visible,
    setVisible,
  };
};
