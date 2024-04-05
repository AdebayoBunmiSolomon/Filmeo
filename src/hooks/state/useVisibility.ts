import { useState } from "react";

export const useVisibility = () => {
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);
  const [passWordVisible, setPassWordVisible] = useState<boolean>(true);

  const onToggleDropDownVisible = () => {
    setDropDownVisible(!dropDownVisible);
  };

  const onTogglePasswordVisible = () => {
    setPassWordVisible(!passWordVisible);
  };

  return {
    onToggleDropDownVisible,
    dropDownVisible,
    passWordVisible,
    onTogglePasswordVisible,
  };
};
