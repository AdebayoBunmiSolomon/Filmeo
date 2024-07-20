import { create } from "zustand";

type userDataType = {
  id: string | number;
  email: string;
  name: string;
  picture: string;
};

interface IUserDataProps {
  userData: userDataType;
  setUserData: (values: userDataType) => void;
}

export const useUserDataStore = create<IUserDataProps>((set) => ({
  userData: {
    id: "" || 0,
    email: "",
    name: "",
    picture: "",
  },
  setUserData: (userData) => set({ userData: userData }),
}));
