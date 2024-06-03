import { useState } from "react";

export const useNextPrev = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const nextBtn = () => {
    setPageNumber(pageNumber + 1);
  };

  const prevBtn = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else if (pageNumber <= 1) {
      //nothing should happen
    }
  };

  return {
    nextBtn,
    prevBtn,
    pageNumber,
  };
};
