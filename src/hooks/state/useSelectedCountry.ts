import { useState } from "react";

type countrySelection = {
  flag: string;
  dial_code: string;
  name: string;
};

export const useSelectedCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState<countrySelection>({
    flag: "",
    dial_code: "",
    name: "",
  });

  return {
    selectedCountry,
    setSelectedCountry,
  };
};
