import { create } from "zustand";

type userDataType = {
  id: string | number;
  email: string | null;
  name: string | null;
  username: string | null;
  picture: string | null;
};

interface IUserDataProps {
  userData: userDataType;
  setUserData: (values: userDataType) => void;
}

export const useUserDataStore = create<IUserDataProps>((set) => ({
  userData: {
    id: "" || 0,
    email: "" || null,
    name: "" || null,
    picture: "" || null,
    username: "" || null,
  },
  setUserData: (userData) => set({ userData: userData }),
}));
